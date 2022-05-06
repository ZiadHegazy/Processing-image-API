import supertest from 'supertest';
import app from '../index';
import { promises as fs } from 'fs';
const request = supertest(app);
it('checking if thumb folder will have new file', async () => {
  const thumb = await fs.readdir('./thumb');
  await request.get('/api/image/?filename=fjord.jpg&width=300&height=400');
  const thumb2 = await fs.readdir('./thumb');
  expect(thumb2.length).toEqual(thumb.length + 1);
});
it('checking if thumb folder will have new file with the wanted dimensions', async () => {
  await request.get('/api/image/?filename=fjord.jpg&width=500&height=800');
  const thumb2 = await fs.readdir('./thumb');
  expect(thumb2.includes('fjord_500_800.jpg'));
});
it('checking if it will not create 2 files with same size', async () => {
  const thumb = await fs.readdir('./thumb');
  await request.get('/api/image/?filename=fjord.jpg&width=500&height=800');
  const thumb2 = await fs.readdir('./thumb');
  expect(thumb2.length).not.toEqual(thumb.length + 1);
});
