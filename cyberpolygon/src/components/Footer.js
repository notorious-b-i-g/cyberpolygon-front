import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="w-100 h-auto mt-5 p-5 text-light bg-dark">
      <div className="navbar footer__container">
        <p className="mt-5 footer__container-cyberpoligon">© {new Date().getFullYear()} Киберполигон</p>   
        <div className="d-flex flex-column footer__container-information">
          <p className="m-auto justify-content-center mb-3">Контактная информация</p>
          <address className="d-flex flex-row gap-2 flex-wrap footer__address">
            <a href="tel:+79885024344">
              <img src="/assets/phone-icon.webp" alt="телефон" width="40" className="footer__container-img" />
            </a>
            <p className="m-2">+79885024344</p>
            <p className="m-2 footer__container-line">|</p>
            <a href="mailto:cyberpolygon@example.com">
              <img src="/assets/email-icon.webp" alt="email" width="40" className="footer__container-img" />
            </a>
            <p className="m-2">cyberpolygon@example.com</p>
          </address>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 