// import axios from 'axios';
import API_CONFIG from '../config/api';
import apiClient from './apiClient';

const API_URL = API_CONFIG.getApiUrl();

/**
 * Получение списка ресурсов
 * @param {Object} params - Параметры запроса
 * @returns {Promise<Array>} Список ресурсов
 */
export const getResources = async (params = {}) => {
  try {
    const response = await apiClient.get('/cyberpolygon/api/v1/resources/', { params });
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении списка ресурсов:', error);
    throw error;
  }
};

/**
 * Получение ресурса по ID
 * @param {number} id - ID ресурса
 * @returns {Promise<Object>} Данные ресурса
 */
export const getResourceById = async (id) => {
  try {
    const response = await apiClient.get(`/cyberpolygon/api/v1/resources/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении ресурса ${id}:`, error);
    throw error;
  }
};

/**
 * Получение ресурсов по категории
 * @param {number} categoryId - ID категории
 * @returns {Promise<Array>} Список ресурсов
 */
export const getResourcesByCategory = async (categoryId) => {
  try {
    const response = await apiClient.get(`/cyberpolygon/api/v1/resources/category/${categoryId}/`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении ресурсов для категории ${categoryId}:`, error);
    throw error;
  }
};

/**
 * Создание нового ресурса
 * @param {Object} resourceData - Данные ресурса
 * @returns {Promise<Object>} Созданный ресурс
 */
export const createResource = async (resourceData) => {
  try {
    const response = await apiClient.post('/cyberpolygon/api/v1/resources/', resourceData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании ресурса:', error);
    throw error;
  }
};

/**
 * Обновление ресурса
 * @param {number} id - ID ресурса
 * @param {Object} resourceData - Обновленные данные
 * @returns {Promise<Object>} Обновленный ресурс
 */
export const updateResource = async (id, resourceData) => {
  try {
    const response = await apiClient.put(`/cyberpolygon/api/v1/resources/${id}/`, resourceData);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при обновлении ресурса ${id}:`, error);
    throw error;
  }
};

export const deleteResource = async (id) => {
  try {
    const response = await apiClient.delete(`/resources/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getResourceCategories = async () => {
  try {
    const response = await apiClient.get('/resources/categories');
    return response;
  } catch (error) {
    console.error('Get resource categories error:', error);
    throw error;
  }
};

export const submitResourceSuggestion = async (resourceData) => {
  try {
    const response = await apiClient.post('/resources/suggest', resourceData);
    return response;
  } catch (error) {
    console.error('Submit resource suggestion error:', error);
    throw error;
  }
}; 