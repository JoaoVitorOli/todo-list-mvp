import TodoModel, { Todo, useTodoModel } from '../models/Todo';
import { TodoViewInterface } from '../views/interfaces/TodoViewInterface';

export class TodoPresenter {
  private model: typeof TodoModel;
  private view: TodoViewInterface;

  private unsubscribe: () => void;

  constructor(view: TodoViewInterface, model = TodoModel) {
    this.view = view;
    this.model = model;

    this.unsubscribe = useTodoModel.subscribe(
      state => {
        this.view.displayTodos(state.todos);
      }
    );
  }

  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  loadTodos(): void {
    const todos = this.model.getAllTodos();
    this.view.displayTodos(todos);
  }

  addTodo(title: string): void {
    if (!title || title.trim() === '') {
      this.view.displayError('O título não pode estar vazio');
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      createdAt: new Date(),
    };

    this.model.addTodo(newTodo);
    this.view.clearInput();
  }

  toggleTodo(id: string): void {
    this.model.toggleTodo(id);
  }

  removeTodo(id: string): void {
    this.model.removeTodo(id);
  }

  getTodoById(id: string): Todo | undefined {
    return this.model.getTodoById(id);
  }
}