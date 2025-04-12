import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TodoItem from '../../src/views/TodoItem';
import { Todo } from '../../src/models/Todo';

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: '1',
    title: 'Testar componente',
    completed: false,
    createdAt: new Date(),
  };

  const onToggleCompletion = jest.fn();
  const onDelete = jest.fn();

  it('deve renderizar o título da tarefa', () => {
    const { getByText } = render(
      <TodoItem
        todo={mockTodo}
        onToggleCompletion={onToggleCompletion}
        onDelete={onDelete}
      />
    );

    expect(getByText('Testar componente')).toBeTruthy();
  });

  it('deve chamar onToggleCompletion quando o checkbox for clicado', () => {
    const { getByTestId } = render(
      <TodoItem
        todo={mockTodo}
        onToggleCompletion={onToggleCompletion}
        onDelete={onDelete}
      />
    );

    const checkbox = getByTestId('checkbox');
    fireEvent.press(checkbox);

    expect(onToggleCompletion).toHaveBeenCalledWith('1');
  });

  it('deve chamar onDelete quando o botão de deletar for clicado', () => {
    const { getByText } = render(
      <TodoItem
        todo={mockTodo}
        onToggleCompletion={onToggleCompletion}
        onDelete={onDelete}
      />
    );

    fireEvent.press(getByText('X'));

    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
