import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { TodoPage } from './components/TodoPage.js';
import { init, listTodos, createTodo, updateTodo, deleteTodo } from './lib/db.js';
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

app.post('/update/:id', async (c) => {
  const id = Number(c.req.param('id'));
  if(!Number.isInteger(id)){
    return c.text('Invalid id',400);
  }

  const body = await c.req.parseBody();
  const rawTitle = body.title;
  const title = typeof rawTitle === 'string' ? rawTitle : '';
  const finished = body.finished === 'on';
  const result = titleSchema.safeParse(title);
  const updated = await updateTodo(id, result.data, finished);
  if(updated === null){
    return c.text('Database error', 500);
  }
  return c.redirect('/');

});

app.post('/delete/:id', async (c) => {
  const id = Number(c.req.param('id'));
  if (!Number.isInteger(id)){
    return c.text('Invalid id', 400);
  }
  const ok = await deleteTodo(id);
  if (ok === null) return c.text('Database error', 500);
  return c.redirect('/');  
});