import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Todo } from '../models/Todo';

interface TodoItemViewProps {
  todo: Todo;
  onToggleCompletion: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({
                                   todo,
                                   onToggleCompletion,
                                   onDelete,
                                 }: TodoItemViewProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onToggleCompletion(todo.id)}
        testID={'checkbox'}
      >
        <View
          style={[
            styles.checkboxInner,
            todo.completed && styles.checkboxChecked,
          ]}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            todo.completed && styles.completedText,
          ]}
        >
          {todo.title}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(todo.id)}
      >
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#007bff',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ff4d4f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
