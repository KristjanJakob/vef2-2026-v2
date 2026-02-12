import type { FC } from 'hono/jsx';

import type { Todo } from '../types.js';

type TodoPageProps = {
  todos?: Todo[];
  error?: string;
  value?: string;
};

export const TodoPage: FC<TodoPageProps> = ({
   todos = [],
   error,
   value = '',
  
  }) => {
  return (
    <section>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form method="post" action="/add">
        <input name="title" value={value} />
        <button type="submit">Bæta við</button>
      </form>

      {todos.length === 0 ? (
        <p>Engin verkefni til</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
};
