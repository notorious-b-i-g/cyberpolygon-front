import React, { useState, useEffect } from 'react';
import '../styles/CustomAlert.css';

const CustomAlert = ({ message, show, type = 'info', onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  const alertClass = `custom-alert ${visible ? 'd-block' : 'd-none'} alert-${type}`;

  return (
    <div id="customAlert" className={alertClass}>
      <span id="customAlertMessage">{message}</span>
    </div>
  );
};

export default CustomAlert; 