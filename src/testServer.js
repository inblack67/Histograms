import { rest, context } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('https://www.vdocipher.com/blog/wp-json/wp/v2/posts?per_page=100', (req, res, context) => {
    return res(
      context.status(200),
      context.json([{ categories: [10, 56, 77] }])
    )
  }),
  rest.get('https://www.vdocipher.com/blog/wp-json/wp/v2/pages?per_page=100', (req, res, context) => {
    return res(
      context.status(200),
      context.json([{ categories: [10, 56, 77] }])
    )
  }),
  rest.get('*', (req, res, context) => {
    return res(
      context.status(500),
      context.json({ success: false, msg: `Please add a request handler for ${req.url.toString()}` })
    )
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
beforeAll(() => server.resetHandlers());

export { server, rest };