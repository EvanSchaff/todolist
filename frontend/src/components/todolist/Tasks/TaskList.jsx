import styled from 'styled-components';
import TaskItem from './TaskItem';
import PropTypes from 'prop-types';

const TaskList = ({ tasks, taskBeingEdited, beginEditingTask, saveTaskEdit, cancelTaskEdit, handleToggleTaskCompletion, handleRemoveTask }) => {
  return (
   <TaskListContainer>
    {tasks.map(task => (
     <TaskItem 
          key={task.task_id} 
          task={task} 
          taskBeingEdited={taskBeingEdited} 
          beginEditingTask={beginEditingTask} 
          saveTaskEdit={saveTaskEdit} 
          cancelTaskEdit={cancelTaskEdit} 
          handleToggleTaskCompletion={handleToggleTaskCompletion} 
          handleRemoveTask={handleRemoveTask} 
        />
      ))}
   </TaskListContainer>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      task_id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      is_completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  taskBeingEdited: PropTypes.shape({
    task_id: PropTypes.string.isRequired,
  }),
  beginEditingTask: PropTypes.func.isRequired,
  saveTaskEdit: PropTypes.func.isRequired,
  cancelTaskEdit: PropTypes.func.isRequired,
  handleToggleTaskCompletion: PropTypes.func.isRequired,
  handleRemoveTask: PropTypes.func.isRequired,
};

const TaskListContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 10px;
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;  
  scrollbar-width: none;  
`;

export default TaskList;