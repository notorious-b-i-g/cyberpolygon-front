import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <h1 className="ms-2 my-3">
        <Link className="text-light" to="/">Киберполигон</Link>
      </h1>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse ms-2" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/">Главная</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/training">Тренировка</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/courses">Курсы</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/resources">Ресурсы</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/forum">Форум</Link>
          </li>

          {!isLoggedIn ? (
            <li className="nav-item" id="loginLink">
              <Link className="nav-link text-decoration-underline text-light me-2 btn" to="/login">Войти</Link>
            </li>
          ) : (
            <li className="nav-item dropdown" id="profileDropdown">
              <a 
                className="nav-link dropdown-toggle text-light" 
                href="#" 
                id="profileMenu" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <span id="usernameDisplay">{username}</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileMenu">
                <li><Link className="dropdown-item" to="/profile">Профиль</Link></li>
                <li><button className="dropdown-item" onClick={handleLogout}>Выйти</button></li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 