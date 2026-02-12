import type { FC } from 'hono/jsx';
import type { Todo } from '../types.js';
import { Layout } from './Layout.js';
import { TodoForm } from './TodoForm.js';
import { TodoList } from './TodoList.js';

type TodoPageProps = {
  todos: Todo[];
  error?: string;
  value?: string;
};

export const TodoPage: FC<TodoPageProps> = ({ todos, error, value }) => {
  const hasFinished = todos.some((t) => t.finished === true);

  return (
    <Layout title="Verkefnalisti">
      <h1>Todo Listi</h1>
      <TodoForm error={error} value={value} />

      <form method="post" action="/delete/finished">
        <button type="submit" disabled={!hasFinished}>
          Eyða öllum kláruðum
        </button>
      </form>

      <TodoList todos={todos} />
    </Layout>
  );
};
