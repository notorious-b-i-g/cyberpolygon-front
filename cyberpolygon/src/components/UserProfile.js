import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserProfile.css';
import API from '../api'; // Импортируем единый API
import CustomAlert from './CustomAlert';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    username: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    email: '',
    organization: '',
    position: '',
    avatar: null
  });
  
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'info'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchProfile();
  }, []);
  
  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const data = await API.user.getUserProfile();
      setProfile(data);
      
      if (data.avatar) {
        setAvatarPreview(data.avatar);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Ошибка при получении профиля:', error);
      showAlert('Ошибка при загрузке профиля', 'error');
      setIsLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };
  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      
      // Создаем превью аватара
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const showAlert = (message, type = 'success') => {
    setAlert({
      show: true,
      message,
      type
    });
    
    // Скрываем уведомление через 3 секунды
    setTimeout(() => {
      setAlert({
        show: false,
        message: '',
        type: 'info'
      });
    }, 3000);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      // Обновляем профиль
      await API.user.updateUserProfile(profile);
      
      // Если выбран новый аватар, загружаем его
      if (avatarFile) {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        await API.user.uploadAvatar(formData);
      }
      
      showAlert('Профиль успешно обновлен');
      setIsLoading(false);
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      showAlert('Ошибка при обновлении профиля', 'error');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div className="container mt-5">
      <h1>Личный кабинет</h1>
      
      <CustomAlert 
        message={alert.message} 
        show={alert.show} 
        type={alert.type} 
        onClose={() => setAlert({...alert, show: false})} 
      />
      
      <div className="row mt-4">
        <div className="col-md-8 user-info-form">
          <div className="avatar-upload">
            <div 
              className="avatar-preview" 
              id="avatarPreview" 
              style={{backgroundImage: avatarPreview ? `url(${avatarPreview})` : 'url(/assets/default-avatar.png)'}}
            ></div>
          </div>
          
          <div className="avatar-upload">
            <input 
              type="file" 
              id="avatarInput" 
              className="avatar-input" 
              onChange={handleAvatarChange}
              accept="image/*"
            />
            <label htmlFor="avatarInput" className="avatar-label">Загрузить фото профиля</label>
          </div>

          <h4>Данные профиля</h4>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Никнейм</label>
              <input 
                type="text" 
                className="form-control" 
                id="username" 
                name="username"
                value={profile.username} 
                onChange={handleChange}
                placeholder="Введите никнейм"
                disabled
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">Имя</label>
              <input 
                type="text" 
                className="form-control" 
                id="first_name" 
                name="first_name"
                value={profile.first_name || ''} 
                onChange={handleChange}
                placeholder="Введите имя"
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">Фамилия</label>
              <input 
                type="text" 
                className="form-control" 
                id="last_name" 
                name="last_name"
                value={profile.last_name || ''} 
                onChange={handleChange}
                placeholder="Введите фамилию"
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="middle_name" className="form-label">Отчество</label>
              <input 
                type="text" 
                className="form-control" 
                id="middle_name" 
                name="middle_name"
                value={profile.middle_name || ''} 
                onChange={handleChange}
                placeholder="Введите отчество"
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="organization" className="form-label">Организация</label>
              <input 
                type="text" 
                className="form-control" 
                id="organization" 
                name="organization"
                value={profile.organization || ''} 
                onChange={handleChange}
                placeholder="Введите название организации"
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="position" className="form-label">Должность</label>
              <input 
                type="text" 
                className="form-control" 
                id="position" 
                name="position"
                value={profile.position || ''} 
                onChange={handleChange}
                placeholder="Введите вашу должность"
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Электронная почта</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                name="email"
                value={profile.email || ''} 
                onChange={handleChange}
                placeholder="Введите почту"
              />
            </div>
            
            <button type="submit" className="btn btn-primary">Сохранить</button>
          </form>
        </div>
        
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header">Статистика</div>
            <div className="card-body">
              <p>Пройдено тестов: 0</p>
              <p>Пройдено курсов: 0</p>
              <p>Рейтинг: 0</p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">Последние активности</div>
            <div className="card-body">
              <p>У вас пока нет активностей</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 