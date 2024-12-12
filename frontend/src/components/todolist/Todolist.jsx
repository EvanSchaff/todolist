import { useState } from 'react';
import styled from 'styled-components';
import Tasks from "./Tasks/Tasks";
import Sidebar from "./Sidebar/Sidebar";
import PropTypes from 'prop-types';

const ToDoList = ({ setIsAuthenticated }) => {
  const [selectedList, setSelectedList] = useState(null);

  return (
   <TodoContainer>
    <TodoBox>
     <Tasks 
        selectedList={selectedList}
        setSelectedList={setSelectedList}
        />
     <Sidebar 
          selectedList={selectedList} 
          setSelectedList={setSelectedList}
          setIsAuthenticated={setIsAuthenticated} 
        />
    </TodoBox>
   </TodoContainer>
  );
};

ToDoList.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
}

export default ToDoList;

const TodoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f4f0;
  font-family: 'Arial', sans-serif;
`;

const TodoBox = styled.div`
  width: 1000px;
  height: 600px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  padding: 0;
  display: flex;
  flex-direction: row;
  position: relative;
`;