import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Course } from '../../types/course';
import api from '../../services/api';

interface CoursesState {
  courses: Course[];
  currentCourse: Course | null;
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  courses: [],
  currentCourse: null,
  loading: false,
  error: null,
};

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    const response = await api.get('/courses');
    return response.data;
  }
);

export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (id: string) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  }
);

export const completeLesson = createAsyncThunk(
  'courses/completeLesson',
  async ({ courseId, lessonId }: { courseId: string; lessonId: string }) => {
    const response = await api.post(`/courses/${courseId}/lessons/${lessonId}/complete`);
    return response.data;
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка получения курсов';
      })
      // Fetch Course By Id
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка получения курса';
      })
      // Complete Lesson
      .addCase(completeLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeLesson.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentCourse) {
          const lessonIndex = state.currentCourse.lessons.findIndex(
            lesson => lesson.id === action.payload.lessonId
          );
          if (lessonIndex !== -1) {
            state.currentCourse.lessons[lessonIndex].completed = true;
          }
          state.currentCourse.progress = action.payload.courseProgress;
        }
        const courseIndex = state.courses.findIndex(
          course => course.id === action.payload.courseId
        );
        if (courseIndex !== -1) {
          state.courses[courseIndex].progress = action.payload.courseProgress;
        }
      })
      .addCase(completeLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка завершения урока';
      });
  },
});

export const { clearError, clearCurrentCourse } = coursesSlice.actions;
export default coursesSlice.reducer; 