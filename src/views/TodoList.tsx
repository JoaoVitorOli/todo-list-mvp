import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { TodoPresenter } from '../presenters/TodoPresenter';
import { TodoViewInterface } from './interfaces/TodoViewInterface';
import { Todo } from '../models/Todo';
import TodoItemView from './TodoItem';

const TodoListView: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const presenterRef = useRef<TodoPresenter | null>(null);

  const viewImplementation: TodoViewInterface = {
    displayTodos: (todosData: Todo[]) => {
      setTodos(todosData);
    },
    displayError: (message: string) => {
      Alert.alert('Erro', message);
    },
    clearInput: () => {
      setNewTodoTitle('');
    }
  };

  useEffect(() => {
    presenterRef.current = new TodoPresenter(viewImplementation);
    presenterRef.current.loadTodos();
  }, []);

  const getPresenter = (): TodoPresenter => {
    if (!presenterRef.current) {
      presenterRef.current = new TodoPresenter(viewImplementation);
    }
    return presenterRef.current;
  };

  const handleAddTodo = () => {
    getPresenter().addTodo(newTodoTitle);
  };

  const handleToggleTodoCompletion = (id: string) => {
    getPresenter().toggleTodo(id);
  };

  const handleDeleteTodo = (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: () => {
            getPresenter().removeTodo(id);
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas (MVP)</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={newTodoTitle}
          onChangeText={setNewTodoTitle}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItemView
            todo={item}
            onToggleCompletion={handleToggleTodoCompletion}
            onDelete={handleDeleteTodo}
          />
        )}
        style={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma tarefa encontrada</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    paddingTop: 24 + 50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: '#007bff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 4,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 32,
    fontSize: 16,
  },
});

export default TodoListView;