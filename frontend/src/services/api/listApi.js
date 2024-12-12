import API from "./axiosConfig";
import { handleError } from "./errorHandler";

export async function fetchLists(userId) {
    try {
      const response = await API.get(`/api/users/${userId}/lists`);
      return response.data;
    } catch (err) {
      handleError(err, 'Failed to fetch lists');
    }
  }
  
  export async function createList(newListName, userId) {
    try {
      const response = await API.post(`/api/users/${userId}/lists`, { title: newListName.trim() });
      return response.data;
    } catch (err) {
      handleError(err, 'Failed to create list');
    }
  }
  
  export async function deleteList(userId, listId) {
    try {
      const response = await API.delete(`/api/users/${userId}/lists/${listId}`);
      return response.data;
    } catch (err) {
      handleError(err, 'Failed to delete list');
    }
  }
  
  export async function editList(userId, listId, title) {
    try {
      const response = await API.put(`/api/users/${userId}/lists/${listId}`, { title });
      return response.data;
    } catch (err) {
      handleError(err, 'Failed to edit list');
    }
  }