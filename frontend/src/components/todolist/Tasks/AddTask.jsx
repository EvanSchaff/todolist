import styled from 'styled-components';
import { Plus, Calendar } from 'lucide-react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect, useRef } from "react";

const AddTask = ({ newTaskText, setNewTaskText, handleAddNewTask, taskDate, setTaskDate }) => {
  const [isDateInputVisible, setIsDateInputVisible] = useState(false);
  const datePickerRef = useRef(null);

  const handleDateButtonClick = () => {
    setIsDateInputVisible(true);
    setTimeout(() => {
      if (datePickerRef.current) {
        datePickerRef.current.setFocus(); 
      }
    }, 0);
  };
  const handleDatePickerBlur = () => {
    if (!taskDate) {
      setIsDateInputVisible(false);
    }
  };

  useEffect(() => {
    if (!taskDate) {
      setIsDateInputVisible(false);
    }
  }, [taskDate]);


  return (
   <AddTaskContainer>
    <NewTaskInput
        type="text"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        placeholder="Add a new task"
        onKeyDown={(e) => e.key === 'Enter' && handleAddNewTask()}
      />
    <DatePickerWrapperStyles>
     {isDateInputVisible ? (
      <StyledDatePicker
          ref={datePickerRef}
          selected={taskDate}
          onChange={(date) => setTaskDate(date)}
          dateFormat="MM/dd/yy"
          isClearable={false}
          showPopperArrow={false}
          autoComplete="off"
          allowKeyboardControl={true}
          strictParsing={false}
          onBlur={handleDatePickerBlur}
          minDate={new Date()}
        />
      ) : (
       <CalendarButton onClick={handleDateButtonClick}>
        {taskDate ? taskDate.toLocaleDateString('en-GB') : <Calendar size={20} />}
       </CalendarButton>
      )}
    </DatePickerWrapperStyles>
    <AddTaskButton onClick={handleAddNewTask}>
     <Plus size={20} />
    </AddTaskButton>
   </AddTaskContainer>
  );
}

AddTask.propTypes = {
  newTaskText: PropTypes.string.isRequired,
  setNewTaskText: PropTypes.func.isRequired,
  handleAddNewTask: PropTypes.func.isRequired,
  taskDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
  setTaskDate: PropTypes.func.isRequired,
};

const AddTaskContainer = styled.div`
  display: flex;
  margin-top: 15px;
`;

const NewTaskInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-right: 10px;
`;

const AddTaskButton = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
`;

const CalendarButton = styled.button`
  background-color: transparent;
  border: 1px solid #e0e0e0;
  color: #757575;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  height: 43px;
  width: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
  font-size: 14px;
  width: 100px;
  height: 43px; 
  box-sizing: border-box; 
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }

  &::placeholder {
    color: #757575;
  }
`;

const DatePickerWrapperStyles = styled.div`
  .react-datepicker {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    border: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  .react-datepicker__header {
    background-color: white;
    border-bottom: 1px solid #f0f0f0;
    border-radius: 10px 10px 0 0;
    padding-top: 10px;
  }

  .react-datepicker__day {
    border-radius: 50%;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  .react-datepicker__day--selected {
    background-color: #4CAF50;
    color: white;

    &:hover {
      background-color: #45a049;
    }
  }

  .react-datepicker__day--keyboard-selected {
    background-color: rgba(76, 175, 80, 0.2);
    color: #4CAF50;
  }

  .react-datepicker__triangle {
    display: none;
  }
`;

export default AddTask;
