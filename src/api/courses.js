import axiosInstance from './axiosInstance';

const COURSES_URL = '/courses';

export const getCourses = async (category = null) => {
  const url = category ? `${COURSES_URL}/?category=${category}` : `${COURSES_URL}/`;
  const response = await axiosInstance.get(url);
  return response.data;
};

export const getCourseById = async (id) => {
  const response = await axiosInstance.get(`${COURSES_URL}/${id}/`);
  return response.data;
};

export const getLessons = async (courseId) => {
  const response = await axiosInstance.get(`${COURSES_URL}/${courseId}/lessons/`);
  return response.data;
};

export const getLessonById = async (courseId, lessonId) => {
  const response = await axiosInstance.get(`${COURSES_URL}/${courseId}/lessons/${lessonId}/`);
  return response.data;
};

export const getCourseBySlug = async (slug) => {
  const response = await axiosInstance.get(`${COURSES_URL}/${slug}/`);
  return response.data;
};

export const getLessonContent = async (courseSlug, lessonSlug) => {
  const response = await axiosInstance.get(`${COURSES_URL}/${courseSlug}/lessons/${lessonSlug}/`);
  return response.data;
};

export const completeLesson = async (courseSlug, lessonSlug) => {
  const response = await axiosInstance.post(`${COURSES_URL}/${courseSlug}/lessons/${lessonSlug}/complete/`);
  return response.data;
};

export const getCourseProgress = async (courseSlug) => {
  const response = await axiosInstance.get(`${COURSES_URL}/${courseSlug}/progress/`);
  return response.data;
};

export const createCourse = async (data) => {
  const response = await axiosInstance.post(`${COURSES_URL}/`, data);
  return response.data;
};

export const updateCourse = async (id, data) => {
  const response = await axiosInstance.patch(`${COURSES_URL}/${id}/`, data);
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await axiosInstance.delete(`${COURSES_URL}/${id}/`);
  return response.data;
};

const coursesApi = {
  getCourses,
  getCourseById,
  getLessons,
  getLessonById,
  getCourseBySlug,
  getLessonContent,
  completeLesson,
  getCourseProgress,
  createCourse,
  updateCourse,
  deleteCourse,
  
  // Алиасы для совместимости
  list: async (category, page, size) => {
    let url = `${COURSES_URL}/`;
    const params = {};
    
    if (category) params.category = category;
    if (page) params.page = page;
    if (size) params.size = size;
    
    const response = await axiosInstance.get(url, { params });
    return response.data;
  },
  
  get: async (slug) => {
    return getCourseBySlug(slug);
  },
  
  create: async (courseData) => {
    return createCourse(courseData);
  }
};

export default coursesApi; 