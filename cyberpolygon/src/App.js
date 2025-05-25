import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Компоненты
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Страницы
import HomePage from './pages/HomePage';
import TrainingPage from './pages/TrainingPage';
import TaskDetailPage from './pages/TaskDetailPage';
import CoursesPage from './pages/CoursesPage';
import ResourcesPage from './pages/ResourcesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import TerminalPage from './pages/TerminalPage';
import ForumPage from './pages/ForumPage';
import ForumTopicPage from './pages/ForumTopicPage';
import CreateForumTopicPage from './pages/CreateForumTopicPage';

// API
import { checkAuth } from './api/auth';

// Защищенный маршрут
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const result = await checkAuth();
      setIsAuthenticated(!!result);
      setIsLoading(false);
    };

    verifyAuth();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/task/:taskId" element={
            <ProtectedRoute>
              <TaskDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/terminal" element={
            <ProtectedRoute>
              <TerminalPage />
            </ProtectedRoute>
          } />
          <Route path="/forum" element={
            <ProtectedRoute>
              <ForumPage />
            </ProtectedRoute>
          } />
          <Route path="/forum/topic/:topicId" element={
            <ProtectedRoute>
              <ForumTopicPage />
            </ProtectedRoute>
          } />
          <Route path="/forum/create" element={
            <ProtectedRoute>
              <CreateForumTopicPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
