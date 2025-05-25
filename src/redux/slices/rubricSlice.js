import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Начальное состояние
const initialState = {
  rubrics: [],
  activeRubric: null,
  isLoading: false,
  error: null,
};

// Async thunk для загрузки всех рубрик
export const fetchRubrics = createAsyncThunk(
  'rubrics/fetchRubrics',
  async (_, { rejectWithValue }) => {
    try {
      // Используем URL-путь, который вы добавили в backend
      const response = await axios.get('/api/cyberpolygon/v1/rubrics/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка загрузки рубрик');
    }
  }
);

// Async thunk для загрузки одной рубрики по ID
export const fetchRubricById = createAsyncThunk(
  'rubrics/fetchRubricById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/cyberpolygon/v1/rubrics/${id}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка загрузки рубрики');
    }
  }
);

// Rubrics slice
const rubricSlice = createSlice({
  name: 'rubrics',
  initialState,
  reducers: {
    setActiveRubric: (state, action) => {
      state.activeRubric = action.payload;
    },
    clearRubricError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка fetchRubrics
      .addCase(fetchRubrics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRubrics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rubrics = action.payload;
      })
      .addCase(fetchRubrics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка загрузки рубрик';
      })
      // Обработка fetchRubricById
      .addCase(fetchRubricById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRubricById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activeRubric = action.payload;
      })
      .addCase(fetchRubricById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка загрузки рубрики';
      });
  },
});

// Экспортируем actions и reducer
export const { setActiveRubric, clearRubricError } = rubricSlice.actions;
export default rubricSlice.reducer;
