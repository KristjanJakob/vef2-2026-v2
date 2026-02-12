import type { FC } from 'hono/jsx';
import { Layout } from './Layout.js';

type ErrorPageProps = {
  title?: string;
  message: string;
};

export const ErrorPage: FC<ErrorPageProps> = ({ title = 'Villa', message }) => {
  return (
    <Layout title={title}>
      <h1>{title}</h1>
      <p style={{ color: 'crimson' }}>{message}</p>
      <p>
        <a href="/">Til baka</a>
      </p>
    </Layout>
  );
};