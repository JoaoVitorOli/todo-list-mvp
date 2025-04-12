import { TodoPresenter } from '../../src/presenters/TodoPresenter';
import TodoModel, { useTodoModel } from '../../src/models/Todo';

const mockView = {
  displayTodos: jest.fn(),
  displayError: jest.fn(),
  clearInput: jest.fn(),
};

describe('TodoPresenter', () => {
  let presenter: TodoPresenter;

  beforeEach(() => {
    useTodoModel.setState({ todos: [] });
    jest.clearAllMocks();
    presenter = new TodoPresenter(mockView);
  });

  it('deve adicionar uma tarefa com título válido', () => {
    presenter.addTodo('Nova Tarefa');

    const todos = TodoModel.getAllTodos();
    expect(todos.length).toBe(1);
    expect(todos[0].title).toBe('Nova Tarefa');
    expect(mockView.clearInput).toHaveBeenCalled();
  });

  it('deve exibir erro se o título estiver vazio', () => {
    presenter.addTodo('  ');
    expect(mockView.displayError).toHaveBeenCalledWith('O título não pode estar vazio');
  });

  it('deve alternar a conclusão da tarefa', () => {
    presenter.addTodo('Teste');
    const todo = TodoModel.getAllTodos()[0];

    presenter.toggleTodo(todo.id);
    expect(TodoModel.getTodoById(todo.id)?.completed).toBe(true);
  });

  it('deve remover uma tarefa', () => {
    presenter.addTodo('Teste');
    const todo = TodoModel.getAllTodos()[0];

    presenter.removeTodo(todo.id);
    expect(TodoModel.getAllTodos()).toHaveLength(0);
  });
});
