import axiosInstance from './axiosInstance';

export const getTasks = async () => {
  const response = await axiosInstance.get('/tasks/');
  return response.data;
};

export const getTaskById = async (id) => {
  const response = await axiosInstance.get(`/tasks/${id}/`);
  return response.data;
};

export const submitFlag = async (taskId, flag) => {
  const response = await axiosInstance.post(`/tasks/${taskId}/submit/`, { flag });
  return response.data;
};

export const getTaskHint = async (taskId) => {
  const response = await axiosInstance.get(`/tasks/${taskId}/hint/`);
  return response.data;
};

export const getTaskProgress = async (taskId) => {
  const response = await axiosInstance.get(`/tasks/${taskId}/progress/`);
  return response.data;
};

export default {
  getTasks,
  getTaskById,
  submitFlag,
  getTaskHint,
  getTaskProgress
}; 