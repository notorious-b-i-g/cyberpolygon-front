import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store';
import TaskCard from '../TaskCard';

const mockTask = {
  id: 1,
  title: 'Тестовое задание',
  description: 'Описание тестового задания',
  difficulty: 'easy',
  category: 'web',
  points: 100,
  isCompleted: false,
};

describe('TaskCard', () => {
  it('renders task information correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TaskCard task={mockTask} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Тестовое задание')).toBeInTheDocument();
    expect(screen.getByText('Описание тестового задания')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('displays correct difficulty badge', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TaskCard task={mockTask} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Легкий')).toBeInTheDocument();
  });
}); 