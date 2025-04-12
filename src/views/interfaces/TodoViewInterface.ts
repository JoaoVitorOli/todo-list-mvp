import { Todo } from '../../models/Todo';

export interface TodoViewInterface {
  displayTodos(todos: Todo[]): void;
  displayError(message: string): void;
  clearInput(): void;
}