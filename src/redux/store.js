import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authReducer from '../features/auth/authSlice';
import rubricReducer from './slices/rubricSlice';
import articleReducer from './slices/articleSlice';

// Для отладки состояния Redux
const preloadedState = {
  user: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  auth: {
    user: null,
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null
  }
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    rubrics: rubricReducer,
    articles: articleReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});

// Для отладки в консоли
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

// Типы для TypeScript
/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 */

/**
 * @typedef {typeof store.dispatch} AppDispatch
 */

export default store;
