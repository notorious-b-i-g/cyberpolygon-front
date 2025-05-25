import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Начальное состояние
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

// Async thunk для логина
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/token/', {
        username,
        password,
      });

      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка аутентификации');
    }
  }
);

// Async thunk для получения текущего пользователя
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      
      const response = await axios.get('/api/auth/user/', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка получения данных пользователя');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка аутентификации';
      })
      // Обработка getCurrentUser
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Не удалось получить данные пользователя';
      });
  },
});

// Экспортируем actions и reducer
export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
