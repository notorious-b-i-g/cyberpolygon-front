import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from '../../types/auth';
import authApi from '../../api/auth';

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const logout = createAsyncThunk('auth/logout', async () => {
  await authApi.logout();
  localStorage.removeItem('token');
});

export const oauthCallback = createAsyncThunk(
  'auth/oauthCallback',
  async ({ code, provider }: { code: string; provider: string }) => {
    const response = await authApi.handleOAuthCallback(code, provider);
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // OAuth callback
      .addCase(oauthCallback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(oauthCallback.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(oauthCallback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка авторизации через OAuth';
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer; 