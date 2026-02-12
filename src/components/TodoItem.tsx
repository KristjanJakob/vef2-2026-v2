import type { FC } from 'hono/jsx';
import type { Todo } from '../types.js';

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  return (
    <li>
      <form method="post" action={`/update/${todo.id}`}>
        <input name="title" value={todo.title} />

        <label>
          <input type="checkbox" name="finished" checked={todo.finished} />
          Lokið
        </label>

        <button type="submit">Uppfæra</button>
      </form>

      <form method="post" action={`/delete/${todo.id}`}>
        <button type="submit">Eyða</button>
      </form>
    </li>
  );
};