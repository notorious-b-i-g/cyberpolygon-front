import React from 'react';
import Terminal from '../components/Terminal';
import '../styles/TerminalPage.css';

const TerminalPage = () => {
  return (
    <div className="terminal-page">
      <div className="container mt-5">
        <h1 className="mb-4">Терминал</h1>
        <div className="card">
          <div className="card-header">
            <h5>SSH Terminal</h5>
          </div>
          <div className="card-body">
            <p>Используйте терминал для взаимодействия с виртуальной машиной.</p>
            <Terminal />
          </div>
        </div>
        
        <div className="mt-4">
          <div className="card">
            <div className="card-header">
              <h5>Инструкция</h5>
            </div>
            <div className="card-body">
              <h6>Основные команды:</h6>
              <ul>
                <li><code>ls</code> - просмотр файлов в текущей директории</li>
                <li><code>cd [директория]</code> - переход в указанную директорию</li>
                <li><code>cat [файл]</code> - просмотр содержимого файла</li>
                <li><code>nano [файл]</code> - редактирование файла</li>
                <li><code>mkdir [директория]</code> - создание новой директории</li>
                <li><code>rm [файл]</code> - удаление файла</li>
                <li><code>ifconfig</code> - просмотр сетевых интерфейсов</li>
                <li><code>ping [хост]</code> - проверка доступности хоста</li>
              </ul>
              
              <p className="mt-3">Управление виртуальной машиной осуществляется с помощью кнопок под терминалом.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalPage; 