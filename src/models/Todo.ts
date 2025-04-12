import { create } from 'zustand';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoModelState {
  todos: Todo[];

  addTodo: (todo: Todo) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
}

export const useTodoModel = create<TodoModelState>((set) => ({
  todos: [
    {
      id: '1',
      title: 'Aprender React Native',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Implementar padrão MVP',
      completed: false,
      createdAt: new Date(),
    },
  ],

  addTodo: (todo) => set((state) => ({
    todos: [...state.todos, todo]
  })),

  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),

  removeTodo: (id) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id)
  })),
}));

export class TodoModel {
  getAllTodos(): Todo[] {
    return useTodoModel.getState().todos;
  }

  getTodoById(id: string): Todo | undefined {
    return this.getAllTodos().find(todo => todo.id === id);
  }

  addTodo(todo: Todo): void {
    useTodoModel.getState().addTodo(todo);
  }

  toggleTodo(id: string): void {
    useTodoModel.getState().toggleTodo(id);
  }

  removeTodo(id: string): void {
    useTodoModel.getState().removeTodo(id);
  }
}

export default new TodoModel();