import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { TodoPage } from './components/TodoPage.js';
import { init, listTodos } from './lib/db.js';

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
