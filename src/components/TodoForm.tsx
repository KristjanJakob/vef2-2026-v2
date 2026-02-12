import type { FC } from 'hono/jsx';

type TodoFormProps = {
  error?: string;
  value?: string;
};

export const TodoForm: FC<TodoFormProps> = ({ error, value = '' }) => {
  return (
    <section>
      {error && <p class="error">{error}</p>}

      <form method="post" action="/add">
        <input name="title" defaultValue={value} />
        <button type="submit">Bæta við</button>
      </form>
    </section>
  );
};