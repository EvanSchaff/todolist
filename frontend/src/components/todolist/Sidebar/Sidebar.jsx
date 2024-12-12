import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import SidebarHeader from './SidebarHeader';
import ListItem from './ListItem';
import AddList from './AddList';
import { fetchLists, createList, deleteList } from '../../../services/api/listApi';
import { logoutUser } from '../../../services/api/authApi';
import styled from 'styled-components';

const Sidebar = ({ selectedList, setSelectedList, setIsAuthenticated }) => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserLists = async () => {
      if (!userId || !token) {
        console.error('User not authenticated');
        return;
      }
      try {
        const response = await fetchLists(userId);
        setLists(response.data);
      } catch (err) {
        console.error('Error fetching lists:', err);
      }
    };

    fetchUserLists();
  }, [userId, token]);

  const handleAddList = async () => {
    if (newListName.trim() === '' || !userId || !token) {
      console.error('Invalid input or user not authenticated');
      return;
    }
    try {
      const response = await createList(newListName, userId);
      const newList = response.data;

      setLists((prevLists) => [...prevLists, newList]);
      setSelectedList({ id: newList.list_id, title: newList.title });
      setNewListName('');
    } catch (err) {
      console.error('Error adding list:', err);
    }
  };

  const handleDeleteList = async (listId) => {
    if (!userId || !token) {
      console.error('User not authenticated');
      return;
    }
    try {
      await deleteList(userId, listId);
      const updatedLists = lists.filter((list) => list.list_id !== listId);
      setLists(updatedLists);
      if (selectedList?.id === listId) {
        setSelectedList(updatedLists.length > 0 ? { id: updatedLists[0].list_id, title: updatedLists[0].title } : null);
      }
    } catch (err) {
      console.error('Error deleting list:', err);
    }
  };

  const handleListClick = (list) => {
    setSelectedList({ id: list.list_id, title: list.title });
  };

  const handleSignOut = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setIsAuthenticated(false);
      navigate('/');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
   <SidebarContainer>
    <SidebarHeader handleSignOut={handleSignOut} />
    <ListContainer>
     {lists.map((list) => (
      <ListItem
            key={list.list_id}
            list={list}
            isActive={selectedList?.id === list.list_id}
            onClick={() => handleListClick(list)}
            onDelete={handleDeleteList}
          />
        ))}
    </ListContainer>
    <AddList newListName={newListName} setNewListName={setNewListName} handleAddList={handleAddList} />
   </SidebarContainer>
  );
};

Sidebar.propTypes = {
  selectedList: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  setSelectedList: PropTypes.func.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Sidebar;

const SidebarContainer = styled.div`
  width: 250px;
  height: 100%;
  background: #66BB6A;
  position: relative;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ListContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
    &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;  
  scrollbar-width: none;  
`;
