import React from 'react';

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Загрузка...</span>
      </div>
      <span className="ms-3">Загрузка...</span>
    </div>
  );
};

export default Loading; 