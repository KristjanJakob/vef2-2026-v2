import type { FC } from 'hono/jsx';
import { Layout } from './Layout.js';

export const NotFoundPage: FC = () => {
  return (
    <Layout title="404">
      <h1>404 — Síða fannst ekki</h1>
      <p>
        <a href="/">Til baka</a>
      </p>
    </Layout>
  );
};