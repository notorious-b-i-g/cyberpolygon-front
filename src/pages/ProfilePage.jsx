import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, updateProfile } from '../api/auth';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: ''
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        setFormData({
          username: userData.username,
          email: userData.email,
          bio: userData.bio || ''
        });
      } catch (err) {
        console.error('Error loading user:', err);
        setError('Не удалось загрузить профиль');
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const updatedUser = await updateProfile(formData);
      setUser(updatedUser);
      setIsEditing(false);
      setSuccess('Профиль успешно обновлен');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Не удалось обновить профиль');
    }
  };

  if (loading) {
    return <div className="loading">Загрузка профиля...</div>;
  }

  if (error && !user) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Профиль</h1>

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!isEditing ? (
          <div className="profile-info">
            <div className="info-group">
              <label>Имя пользователя</label>
              <p>{user.username}</p>
            </div>

            <div className="info-group">
              <label>Email</label>
              <p>{user.email}</p>
            </div>

            {user.bio && (
              <div className="info-group">
                <label>О себе</label>
                <p>{user.bio}</p>
              </div>
            )}

            <div className="info-group">
              <label>Провайдер авторизации</label>
              <p>{user.oauth_provider || 'Не указан'}</p>
            </div>

            <button 
              onClick={() => setIsEditing(true)}
              className="edit-button"
            >
              Редактировать профиль
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label htmlFor="username">Имя пользователя</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                readOnly
              />
              <small>Email связан с вашим аккаунтом OAuth и не может быть изменен</small>
            </div>

            <div className="form-group">
              <label htmlFor="bio">О себе</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="save-button">
                Сохранить
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    username: user.username,
                    email: user.email,
                    bio: user.bio || ''
                  });
                }}
                className="cancel-button"
              >
                Отмена
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage; 