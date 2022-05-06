import supertest from 'supertest';
import app from '../index';
const request = supertest(app);
it('url with less parameters', async () => {
  const response = await request.get('/api/image?filename=123');
  expect(response.text).toBe('please enter a filename and height and a width');
});

it('url with wrong file name', async () => {
  const response = await request.get(
    '/api/image?filename=123&width=200&height=300'
  );
  expect(response.text).toBe('invalid name or invalid file extension');
});
