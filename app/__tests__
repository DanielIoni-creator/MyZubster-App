const request = require('supertest');
const app = require('../server');

describe('Auth API', () => {
  test('POST /api/users/register - successo', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        email: 'test@example.com',
        password: 'test123',
        name: 'Test User'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', 'test@example.com');
  });

  test('POST /api/users/login - successo', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'test123'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('POST /api/users/login - fallimento (password errata)', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'wrong'
      });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});