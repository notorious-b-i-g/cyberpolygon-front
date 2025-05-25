// import axios from 'axios';
import API_CONFIG from '../config/api';
import apiClient from './apiClient';

const API_URL = API_CONFIG.getApiUrl();

/**
 * Получение списка курсов
 * @param {Object} params - Параметры запроса
 * @returns {Promise<Array>} Список курсов
 */
export const getCourses = async (params = {}) => {
  try {
    const response = await apiClient.get('/v1/courses/', { params });
    return response;
  } catch (error) {
    console.error('Ошибка при получении списка курсов:', error);
    throw error;
  }
};

/**
 * Получение курса по ID
 * @param {number} id - ID курса
 * @returns {Promise<Object>} Данные курса
 */
export const getCourseById = async (id) => {
  try {
    const response = await apiClient.get(`/v1/courses/${id}/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении курса ${id}:`, error);
    throw error;
  }
};

/**
 * Запись пользователя на курс
 * @param {number} courseId - ID курса
 * @returns {Promise<Object>} Результат операции
 */
export const enrollCourse = async (courseId) => {
  try {
    const response = await apiClient.post(`/v1/courses/${courseId}/enroll/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при записи на курс ${courseId}:`, error);
    throw error;
  }
};

/**
 * Получение списка курсов пользователя
 * @returns {Promise<Array>} Список курсов пользователя
 */
export const getUserCourses = async () => {
  try {
    const response = await apiClient.get('/v1/user/courses/');
    return response;
  } catch (error) {
    console.error('Ошибка при получении списка курсов пользователя:', error);
    throw error;
  }
};

/**
 * Получение прогресса по курсу
 * @param {number} courseId - ID курса
 * @returns {Promise<Object>} Данные прогресса
 */
export const getCourseProgress = async (courseId) => {
  try {
    const response = await apiClient.get(`/v1/courses/${courseId}/progress/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении прогресса по курсу ${courseId}:`, error);
    throw error;
  }
};

export const getCourseLessons = async (courseId) => {
  try {
    const response = await apiClient.get(`/courses/${courseId}/lessons`);
    return response;
  } catch (error) {
    console.error(`Get lessons for course ${courseId} error:`, error);
    throw error;
  }
};

export const getLessonById = async (courseId, lessonId) => {
  try {
    const response = await apiClient.get(`/courses/${courseId}/lessons/${lessonId}`);
    return response;
  } catch (error) {
    console.error(`Get lesson ${lessonId} for course ${courseId} error:`, error);
    throw error;
  }
};

export const completeLessonById = async (courseId, lessonId) => {
  try {
    const response = await apiClient.post(`/courses/${courseId}/lessons/${lessonId}/complete`);
    return response;
  } catch (error) {
    console.error(`Complete lesson ${lessonId} for course ${courseId} error:`, error);
    throw error;
  }
}; 