import TodoModel, { Todo, useTodoModel } from '../../src/models/Todo';

describe('TodoModel', () => {
  beforeEach(() => {
    useTodoModel.setState({ todos: [] });
  });

  it('adiciona uma nova tarefa', () => {
    const todo: Todo = {
      id: '123',
      title: 'Testar',
      completed: false,
      createdAt: new Date(),
    };

    TodoModel.addTodo(todo);

    const todos = TodoModel.getAllTodos();
    expect(todos).toHaveLength(1);
    expect(todos[0]).toMatchObject(todo);
  });

  it('alterna o estado de conclusão da tarefa', () => {
    const todo: Todo = {
      id: '1',
      title: 'Tarefa 1',
      completed: false,
      createdAt: new Date(),
    };

    TodoModel.addTodo(todo);
    TodoModel.toggleTodo('1');

    const updated = TodoModel.getTodoById('1');
    expect(updated?.completed).toBe(true);
  });

  it('remove uma tarefa', () => {
    const todo: Todo = {
      id: '1',
      title: 'Tarefa 1',
      completed: false,
      createdAt: new Date(),
    };

    TodoModel.addTodo(todo);
    TodoModel.removeTodo('1');

    expect(TodoModel.getTodoById('1')).toBeUndefined();
  });
});
