import type { FC } from 'hono/jsx';
import type { Todo } from '../types.js';
import { TodoItem } from './TodoItem.js';

type TodoListProps = {
  todos: Todo[];
};

export const TodoList: FC<TodoListProps> = ({ todos }) => {
  if (todos.length === 0) {
    return <p>Engin verkefni til</p>;
  }

  return (
    <ul>
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} />
      ))}
    </ul>
  );
};