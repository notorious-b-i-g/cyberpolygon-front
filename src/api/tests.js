import axiosInstance from './axiosInstance';

const TESTS_URL = '/tests';

export const getTests = async () => {
  const response = await axiosInstance.get(`${TESTS_URL}/`);
  return response.data;
};

export const getTestById = async (id) => {
  const response = await axiosInstance.get(`${TESTS_URL}/${id}/`);
  return response.data;
};

export const startTest = async (testId) => {
  const response = await axiosInstance.post(`${TESTS_URL}/${testId}/start/`);
  return response.data;
};

export const submitTest = async (id, answers) => {
  const response = await axiosInstance.post(`${TESTS_URL}/${id}/submit/`, { answers });
  return response.data;
};

export const getTestResults = async (testId) => {
  const response = await axiosInstance.get(`${TESTS_URL}/${testId}/results/`);
  return response.data;
};

export default {
  getTests,
  getTestById,
  startTest,
  submitTest,
  getTestResults
}; 