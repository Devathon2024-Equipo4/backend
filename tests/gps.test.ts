import request from 'supertest';
import app from '../app';
import { type Address } from '@prisma/client';

describe('POST /gps', () => {
    it('should create a new address', async () => {
      const response = await request(app)
        .post('/api/v1/gps')
        .send({ address: 'veracruz' });
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        address: {
            address: 'veracruz', 
            id: expect.any(String),  
            created_at: expect.any(String),
            updated_at: expect.any(String),
        },
    });
    });
  });

describe('GET /gps', () => {
  it('should return all addresses', async () => {
    const response = await request(app).get('/api/v1/gps');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      address: expect.arrayContaining([
          expect.objectContaining({
              id: expect.any(String),
              address: expect.any(String),
              created_at: expect.any(String), 
          }),
      ]),
    });
  });
});

describe('GET /gps/recent', () => {
  it('should return the last 5 addresses', async () => {
      const response = await request(app).get('/api/v1/gps/recent');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
          address: expect.arrayContaining([
              expect.objectContaining({
                  id: expect.any(String),               
                  address: expect.any(String),
                  created_at: expect.any(String),  
                  updated_at: expect.any(String),
              }),
          ]),
      });

      
      expect(response.body.address.length).toBeLessThanOrEqual(5);
  });
});