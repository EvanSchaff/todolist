import API from './axiosConfig';
import { handleError } from './errorHandler';

export async function fetchTasks(userId, listId) {
    try {
      const response = await API.get(`/api/users/${userId}/lists/${listId}/tasks`);
      return response.data;
    } catch (err) {
      handleError(err, 'Failed to fetch tasks');
    }
  }
  
  export async function createTask(userId, listId, task, dueDate) {
    try {
      const response = await API.post(`/api/users/${userId}/lists/${listId}/tasks`, { task, dueDate });
      return response.data;
    } catch (err) {
      handleError(err, 'Failed to create task');
    }
  }
  
  export async function deleteTask(userId, listId, taskId) {
    try {
      const response = await API.delete(`/api/users/${userId}/lists/${listId}/tasks/${taskId}`);
      return response.data;
    } catch (err) {
      handleError(err, 'Failed to delete task');
    }
  }
  
  export async function editTask(userId, listId, taskId, task) {
    try {
      const response = await API.put(`/api/users/${userId}/lists/${listId}/tasks/${taskId}`, { task });
      return response.data;
    } catch (err) {
      handleError(err, 'Failed to edit task');
    }
  }
  
  export async function toggleTaskCompletion(userId, listId, taskId) {
    try {
      const response = await API.patch(`/api/users/${userId}/lists/${listId}/tasks/${taskId}/complete`);
      return response.data;
    } catch (err) {
      handleError(err, 'Failed to toggle task completion');
    }
  }