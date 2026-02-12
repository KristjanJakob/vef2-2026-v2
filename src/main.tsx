import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { TodoPage } from './components/TodoPage.js';
import { init, listTodos, createTodo } from './lib/db.js';
import { titleSchema } from './lib/validation.js';

// búum til og exportum Hono app
export const app = new Hono();
await init();


// sendir út allt sem er í static möppunni
app.use('/static/*', serveStatic({ root: './' }));

app.get('/', async (c) => {
  const todos = await listTodos();

  if (!todos) {
    return c.text('Database error', 500);
  }

  return c.html(<TodoPage todos={todos} />);
});

app.post('/add', async (c) => {
  const body = await c.req.parseBody();
  const title = body.title;
  const result = titleSchema.safeParse(title);
  if(!result.success){
    const todos = await listTodos();
    
    return c.html(
      <TodoPage
        todos={todos ?? []}
        error={result.error.issues[0]?.message}
        value={String(title ?? '')}
      />
    )
  }
  const created = await createTodo(result.data);
  if (!created) {
    return c.text('Database error', 500);
  }
  return c.redirect('/');
});
