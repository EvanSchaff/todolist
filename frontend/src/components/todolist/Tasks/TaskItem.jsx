import styled from 'styled-components';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import PropTypes from 'prop-types';

const TaskItem = ({ task, taskBeingEdited, beginEditingTask, saveTaskEdit, cancelTaskEdit, handleToggleTaskCompletion, handleRemoveTask }) => {
  return (
   <TaskItemContainer $completed={task.is_completed}>
    {taskBeingEdited && taskBeingEdited.task_id === task.task_id ? (
     <EditTaskContainer>
      <EditInput
            type="text"
            defaultValue={task.description}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveTaskEdit(e.currentTarget.value);
              if (e.key === 'Escape') cancelTaskEdit();
            }}
            autoFocus
          />
      <ActionButtons>
       <SaveButton onClick={() => saveTaskEdit(document.querySelector('input[type="text"]').value)}>
        <Check size={18} />
       </SaveButton>
       <CancelButton onClick={cancelTaskEdit}>
        <X size={18} />
       </CancelButton>
      </ActionButtons>
     </EditTaskContainer>
      ) : (
       <>
        <Checkbox
          type="checkbox"
          checked={task.is_completed}
          onChange={() => handleToggleTaskCompletion(task.task_id)}
        />
        <TaskContent>
         <TaskText $completed={task.is_completed}>{task.description}</TaskText>
         {task.due_date && <TaskDate>{new Date(task.due_date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}</TaskDate>}

        </TaskContent>
        <TaskActions>
         <EditButton onClick={() => beginEditingTask(task)}>
          <Edit2 size={16} />
         </EditButton>
         <DeleteButton onClick={() => handleRemoveTask(task.task_id)}>
          <Trash2 size={16} />
         </DeleteButton>
        </TaskActions>
       </>
    )}
   </TaskItemContainer>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    task_id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    is_completed: PropTypes.bool.isRequired,
    due_date: PropTypes.string,
  }).isRequired,
  taskBeingEdited: PropTypes.shape({
    task_id: PropTypes.string.isRequired,
  }),
  beginEditingTask: PropTypes.func.isRequired,
  saveTaskEdit: PropTypes.func.isRequired,
  cancelTaskEdit: PropTypes.func.isRequired,
  handleToggleTaskCompletion: PropTypes.func.isRequired,
  handleRemoveTask: PropTypes.func.isRequired,
};

const TaskItemContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.$completed ? '#f0f0f0' : 'white'};
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.3s ease;
`;

const SaveButton = styled.button`
  background: none;
  border: none;
  color: #4CAF50;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  color: #F44336;
  cursor: pointer;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 10px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #F44336;
  cursor: pointer;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: #4CAF50;
  cursor: pointer;
`;

const TaskText = styled.span`
  flex-grow: 1;
  text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
  color: ${props => props.$completed ? '#888' : '#333'};
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const EditTaskContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
`;

const EditInput = styled.input`
  flex-grow: 1;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
`;

const TaskDate = styled.span`
  color: #555;
  font-size: 0.85em;
  font-weight: bold;
  background-color: #f9f9f9;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const TaskContent = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default TaskItem;