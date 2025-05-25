import { useSelector, useDispatch } from 'react-redux';
import { logout, setUser, setLoading, setError } from '../redux/userSlice';
import authApi from '../api/auth';

/**
 * @typedef {import('../redux/store').RootState} RootState
 */

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state: any) => state.user);

  const handleLogin = async (provider: string): Promise<string> => {
    try {
      dispatch(setLoading(true));
      const authUrl = await authApi.getOAuthUrl(provider);
      return authUrl;
    } catch (err: any) {
      console.error('Failed to get OAuth URL:', err);
      dispatch(setError(err.message || 'Ошибка авторизации'));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      dispatch(setLoading(true));
      await authApi.logout();
      dispatch(logout());
    } catch (err: any) {
      console.error('Failed to logout:', err);
      dispatch(setError(err.message || 'Ошибка при выходе'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const checkAuth = async (): Promise<boolean> => {
    try {
      dispatch(setLoading(true));
      
      if (!authApi.isAuthenticated()) {
        return false;
      }
      
      const userData = await authApi.getCurrentUser();
      dispatch(setUser(userData));
      return true;
    } catch (err: any) {
      console.error('Failed to get current user:', err);
      dispatch(logout());
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
    checkAuth
  };
};
