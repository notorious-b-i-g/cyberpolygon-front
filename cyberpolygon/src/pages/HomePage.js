import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="hero-heading">Киберполигон</h1>
              <p className="hero-subheading">Платформа для обучения и тестирования навыков кибербезопасности</p>
              <div className="hero-buttons">
                <Link to="/training" className="btn btn-primary btn-lg me-3">Начать тренировку</Link>
                <Link to="/courses" className="btn btn-outline-light btn-lg">Изучить курсы</Link>
              </div>
            </div>
            <div className="col-md-6">
              <img src="/assets/hero-image.png" alt="Киберполигон" className="hero-image" />
            </div>
          </div>
        </div>
      </div>

      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Что предлагает Киберполигон?</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fa fa-shield" aria-hidden="true"></i>
                </div>
                <h3>Практические задания</h3>
                <p>Реальные сценарии кибератак и защиты, которые помогут развить навыки обнаружения и противодействия угрозам.</p>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                </div>
                <h3>Обучающие курсы</h3>
                <p>Структурированные курсы по различным аспектам кибербезопасности, разработанные экспертами отрасли.</p>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fa fa-trophy" aria-hidden="true"></i>
                </div>
                <h3>Соревнования</h3>
                <p>Регулярные CTF-соревнования и задачи для проверки и совершенствования навыков в конкурентной среде.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="mb-4">Готовы начать?</h2>
          <p className="lead mb-4">Присоединяйтесь к сообществу специалистов по кибербезопасности уже сегодня!</p>
          <Link to="/register" className="btn btn-light btn-lg">Зарегистрироваться</Link>
        </div>
      </section>

      <section className="testimonials-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Отзывы пользователей</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"Киберполигон помог мне развить практические навыки, которые я не мог получить в теоретических курсах. Отличная платформа!"</p>
                </div>
                <div className="testimonial-author">
                  <img src="/assets/user1.jpg" alt="Пользователь" className="testimonial-avatar" />
                  <div>
                    <h5>Алексей П.</h5>
                    <p>Системный администратор</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"Структурированный подход к обучению и реалистичные сценарии атак сделали процесс обучения интересным и продуктивным."</p>
                </div>
                <div className="testimonial-author">
                  <img src="/assets/user2.jpg" alt="Пользователь" className="testimonial-avatar" />
                  <div>
                    <h5>Марина С.</h5>
                    <p>Студент ИТ-специальности</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"Как руководитель ИТ-отдела, я рекомендую Киберполигон всем сотрудникам для повышения осведомленности о кибербезопасности."</p>
                </div>
                <div className="testimonial-author">
                  <img src="/assets/user3.jpg" alt="Пользователь" className="testimonial-avatar" />
                  <div>
                    <h5>Дмитрий К.</h5>
                    <p>CIO компании</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 