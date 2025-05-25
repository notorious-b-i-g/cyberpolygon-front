import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Начальное состояние
const initialState = {
  articles: [],
  activeArticle: null,
  isLoading: false,
  error: null,
};

// Async thunk для загрузки всех статей
export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/cyberpolygon/v1/articles/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка загрузки статей');
    }
  }
);

// Async thunk для загрузки статьи по ID
export const fetchArticleById = createAsyncThunk(
  'articles/fetchArticleById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/cyberpolygon/v1/articles/${id}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка загрузки статьи');
    }
  }
);

// Async thunk для загрузки статей по рубрике
export const fetchArticlesByRubric = createAsyncThunk(
  'articles/fetchArticlesByRubric',
  async (rubricName, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/cyberpolygon/v1/articles/rubric/${rubricName}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка загрузки статей по рубрике');
    }
  }
);

// Articles slice
const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setActiveArticle: (state, action) => {
      state.activeArticle = action.payload;
    },
    clearArticleError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка fetchArticles
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка загрузки статей';
      })
      // Обработка fetchArticleById
      .addCase(fetchArticleById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activeArticle = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка загрузки статьи';
      })
      // Обработка fetchArticlesByRubric
      .addCase(fetchArticlesByRubric.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticlesByRubric.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticlesByRubric.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка загрузки статей по рубрике';
      });
  },
});

// Экспортируем actions и reducer
export const { setActiveArticle, clearArticleError } = articleSlice.actions;
export default articleSlice.reducer;
