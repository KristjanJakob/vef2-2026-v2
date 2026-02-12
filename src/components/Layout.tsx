import type { FC } from 'hono/jsx';

type LayoutProps = {
  title?: string;
  children: unknown;
};

export const Layout: FC<LayoutProps> = ({ title = 'Todos', children }) => {
  return (
    <html lang="is">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <link rel="stylesheet" href="/static/styles.css" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};