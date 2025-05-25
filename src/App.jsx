import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/queryClient';
import Layout from './components/layout/Layout';
import AuthProvidersPage from './pages/AuthProvidersPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import ProfilePage from './pages/ProfilePage';
import CoursesPage from './pages/CoursesPage';
import CoursePage from './pages/CoursePage';
import TaskPage from './pages/TaskPage';
import TestsPage from './pages/TestsPage';
import TestView from './pages/TestView';
import TerminalPage from './pages/TerminalPage';
import HomePage from './pages/HomePage';
import ResourcesPage from './pages/ResourcesPage';
import ArticlePage from './pages/ArticlePage';
import ErrorPage from './pages/ErrorPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import { FEATURES } from './config/env';
import { Alert } from '@mui/material';
import { NotificationProvider } from './contexts/NotificationContext';
import NotificationSnack, { SlideTransition } from './components/ui/NotificationSnack';
import { notistackConfig } from './theme/NotificationStyles';
import { ThemeContextProvider } from './theme/ThemeContext';

// Mock mode indicator banner
const MockModeBanner = () => {
  if (!FEATURES.USE_MOCKS) return null;
  
  return (
    <Alert 
      severity="warning" 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        borderRadius: 0 
      }}
    >
      Режим моков активен (REACT_APP_USE_MOCKS=true)
    </Alert>
  );
};

// Маршрут только для неавторизованных пользователей
const PublicOnlyRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('access_token') !== null;
  return !isAuthenticated ? children : <Navigate to="/profile" replace />;
};

const App = () => {
  return (
    <ThemeContextProvider>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          {...notistackConfig}
          TransitionComponent={SlideTransition}
          Components={{
            success: NotificationSnack,
            error: NotificationSnack,
            warning: NotificationSnack,
            info: NotificationSnack,
          }}
        >
          <NotificationProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  {/* Публичные маршруты */}
                  <Route index element={<HomePage />} />
                  <Route path="auth" element={
                    <PublicOnlyRoute>
                      <AuthProvidersPage />
                    </PublicOnlyRoute>
                  } />
                  <Route path="auth/callback" element={<AuthCallbackPage />} />
                  {/* Публичная страница курсов */}
                  <Route path="courses" element={<CoursesPage />} />
                  
                  {/* Ресурсы и статьи (публичные) */}
                  <Route path="resources" element={<ResourcesPage />} />
                  <Route path="articles/:id" element={<ArticlePage />} />
                  <Route path="rubrics/:slug" element={<ResourcesPage />} />

                  {/* Защищенные маршруты */}
                  <Route element={<PrivateRoute />}>
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="courses/:id" element={<CoursePage />} />
                    <Route path="tasks/:id" element={<TaskPage />} />
                    <Route path="tests" element={<TestsPage />} />
                    <Route path="tests/:id" element={<TestView />} />
                    <Route path="terminal" element={<TerminalPage />} />
                  </Route>

                  {/* Тестовый маршрут для страницы ошибки */}
                  <Route path="error" element={<ErrorPage code="500" message="Произошла ошибка сервера" />} />

                  {/* Страница 404 для неизвестных маршрутов */}
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
            <MockModeBanner />
          </NotificationProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </ThemeContextProvider>
  );
};

export default App;