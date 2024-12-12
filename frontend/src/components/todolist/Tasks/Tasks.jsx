import { useEffect, useState } from "react";
import styled from 'styled-components';
import { createTask, deleteTask, editTask, fetchTasks, toggleTaskCompletion } from "../../../services/api/taskApi";
import { editList } from "../../../services/api/listApi";
import PropTypes from 'prop-types';
import TaskHeader from './TaskHeader';
import TaskList from './TaskList'; 
import AddTask from './AddTask'; 

const TaskCache = {
  get: (listId) => {
    try {
      const cachedData = localStorage.getItem(`tasks_cache_${listId}`);
      if (!cachedData) return null;

      const { tasks, timestamp } = JSON.parse(cachedData);
      return Date.now() - timestamp < 3600000 ? tasks : null;
    } catch (error) {
      console.error('Cache read error:', error);
      return null;
    }
  },

  set: (listId, tasks) => {
    try {
      localStorage.setItem(
        `tasks_cache_${listId}`,
        JSON.stringify({ tasks, timestamp: Date.now() })
      );
    } catch (error) {
      console.error('Cache write error:', error);
    }
  },

  remove: (listId) => {
    try {
      localStorage.removeItem(`tasks_cache_${listId}`);
    } catch (error) {
      console.error('Cache remove error:', error);
    }
  }
};


const Tasks = ({ selectedList, setSelectedList }) => {
  const [tasks, setTasks] = useState([]); 
  const [newTaskText, setNewTaskText] = useState('');
  const [taskBeingEdited, setTaskBeingEdited] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [taskDate, setTaskDate] = useState('');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const loadTasksForSelectedList = async () => {
      if (!selectedList || !selectedList.id) {
        setTasks([]); 
        return;
      }

      // Check cache first
      const cachedTasks = TaskCache.get(selectedList.id);
      if (cachedTasks) {
        setTasks(cachedTasks);
        return;
      }

      try {
        const response = await fetchTasks(userId, selectedList.id)
        const fetchedTasks = response.data || [];
        
        TaskCache.set(selectedList.id, fetchedTasks);
        
        setTasks(fetchedTasks); 
      } catch (error) {
        console.error('Failed to load tasks:', error);
        setTasks([]); 
      }
    };

    loadTasksForSelectedList();
  }, [selectedList, userId]);

  useEffect(() => {
    if (!selectedList || !selectedList.id) {
      return;
    }
    setEditedTitle(selectedList.title);
  }, [selectedList]);

  const handleAddNewTask = async () => {
    if (!selectedList || newTaskText.trim() === '') return;

    try {
      const response = await createTask(userId, selectedList.id, newTaskText, taskDate)
      const newTask = response.data;

      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      TaskCache.set(selectedList.id, updatedTasks);

      setNewTaskText('');
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const handleRemoveTask = async (taskId) => {
    if (!selectedList) return;
  
    try {
      await deleteTask(userId, selectedList.id, taskId);
  
      const updatedTasks = tasks.filter(task => task.task_id !== taskId);
      setTasks(updatedTasks);
      TaskCache.set(selectedList.id, updatedTasks);
    } catch (error) {
      console.error('Failed to remove task:', error);
    }
  };

  const handleToggleTaskCompletion = async (taskId) => {
    if (!selectedList) return;

    try {
      const response = await toggleTaskCompletion(userId, selectedList.id, taskId);

      const updatedTasks = tasks.map(task => 
        task.task_id === response.data.task_id 
          ? response.data 
          : task
      );
      
      setTasks(updatedTasks);
      TaskCache.set(selectedList.id, updatedTasks);
    } catch (error) {
      console.error('Failed to toggle task completion:', error);
    }
  };

  const beginEditingTask = (task) => setTaskBeingEdited(task);

  const saveTaskEdit = async (newDescription) => {
    if (!selectedList || newDescription.trim() === '' || !taskBeingEdited) return;

    try {
      const response = await editTask(
        userId, 
        selectedList.id, 
        taskBeingEdited.task_id, 
        newDescription
      )

      const updatedTasks = tasks.map(task => 
        task.task_id === response.data.task_id ? response.data : task
      );
      
      setTasks(updatedTasks);
      TaskCache.set(selectedList.id, updatedTasks);
      setTaskBeingEdited(null);
    } catch (error) {
      console.error('Failed to update task description:', error);
    }
  };

  const cancelTaskEdit = () => setTaskBeingEdited(null);

  const handleTitleEditBegin = () => {
    setIsEditingTitle(true);
  };

  const handleUpdateListTitle = async (newTitle) => {
    if (!selectedList) return;
  
    try {
      const response = await editList(userId, selectedList.id, newTitle);

      setSelectedList((prevSelectedList) => ({
        ...prevSelectedList,
        title: response.data.title,
      }));

      TaskCache.remove(selectedList.id);
    } catch (error) {
      console.error('Failed to update list title:', error);
    }
  };

  const handleTitleEditSave = () => {
    if (editedTitle.trim()) {
      handleUpdateListTitle(editedTitle.trim());
      setIsEditingTitle(false);
    }
  };

  const handleTitleEditCancel = () => {
    setEditedTitle(selectedList.title);
    setIsEditingTitle(false);
  };

  if (!selectedList) {
    return (
     <TaskArea>
      <h2>Select a List to View Tasks</h2>
     </TaskArea>
    );
  }

  return (
   <TaskArea>
    <TaskHeader 
      isEditingTitle={isEditingTitle} 
      editedTitle={editedTitle || ''} 
      setEditedTitle={setEditedTitle} 
      handleTitleEditSave={handleTitleEditSave} 
      handleTitleEditCancel={handleTitleEditCancel} 
      handleTitleEditBegin={handleTitleEditBegin} 
      selectedList={selectedList}
    />

    <TaskList 
      tasks={tasks} 
      taskBeingEdited={taskBeingEdited} 
      beginEditingTask={beginEditingTask} 
      saveTaskEdit={saveTaskEdit} 
      cancelTaskEdit={cancelTaskEdit} 
      handleToggleTaskCompletion={handleToggleTaskCompletion} 
      handleRemoveTask={handleRemoveTask}
    />

    <AddTask 
      newTaskText={newTaskText} 
      setNewTaskText={setNewTaskText} 
      handleAddNewTask={handleAddNewTask}
      taskDate={taskDate} 
      setTaskDate={setTaskDate} 
    />
   </TaskArea>
  );
};

Tasks.propTypes = {
  selectedList: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  setSelectedList: PropTypes.func.isRequired,
};

const TaskArea = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f9f9f9;
`;

export default Tasks;