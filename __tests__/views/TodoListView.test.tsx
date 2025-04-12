import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TodoListView from '../../src/views/TodoList';

jest.mock('react-native/Libraries/Alert/Alert', () => {
  return {
    alert: jest.fn(),
  };
});

describe('TodoListView', () => {
  it('deve renderizar o título da tela', () => {
    const { getByText } = render(<TodoListView />);
    expect(getByText('Lista de Tarefas (MVP)')).toBeTruthy();
  });

  it('deve adicionar uma nova tarefa quando o botão for pressionado', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<TodoListView />);

    const input = getByPlaceholderText('Nova tarefa...');
    const addButton = getByText('Adicionar');

    fireEvent.changeText(input, 'Nova tarefa');
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(queryByText('Nova tarefa')).toBeTruthy();
    });
  });

  it('não deve adicionar tarefa vazia e mostrar alerta', () => {
    const Alert = require('react-native/Libraries/Alert/Alert');
    const { getByText } = render(<TodoListView />);
    fireEvent.press(getByText('Adicionar'));
    expect(Alert.alert).toHaveBeenCalledWith(
      'Erro',
      'O título não pode estar vazio'
    );
  });
});
