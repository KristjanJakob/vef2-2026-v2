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
        <input name="title" defaultValue={value} />
        <button type="submit">Bæta við</button>
      </form>

      {todos.length === 0 ? (
        <p>Engin verkefni til</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <form method="post" action={`/update/${todo.id}`}>
                <input name="title" defaultValue={todo.title} />

                <label>
                  <input
                    type="checkbox"
                    name="finished"
                    defaultChecked={todo.finished}
                  />
                  Lokið
                </label>

                <button type="submit">Uppfæra</button>
              </form>

              <form method="post" action={`/delete/${todo.id}`}>
                <button type="submit">Eyða</button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
