import supertest from 'supertest';
import { server } from './index';

const mockUser = {
  username: 'John',
  age: 25,
  hobbies: ['reading', 'soccer'],
};

const updatedUser = {
  username: 'Tom',
  age: 35,
  hobbies: ['gardening'],
};

const request = supertest.agent(server);

describe('crud-spi', () => {
  test('should perform correct working with all correct requests', async () => {
    //get empty array with first request
    const res = await request.get('/api/users');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);

    //create a single user
    const createReq = await request.post('/api/users').send(JSON.stringify(mockUser));

    expect(createReq.status).toBe(201);

    //check created user by id
    const { id } = createReq.body;

    const userByIdReq = await request.get(`/api/users/${id}`);

    expect(userByIdReq.status).toBe(200);
    expect(userByIdReq.body).toEqual({ id, ...mockUser });

    //update user
    const updateReq = await request.put(`/api/users/${id}`).send(JSON.stringify({ id, ...updatedUser }));

    expect(updateReq.status).toBe(200);

    //check that user was updated
    const updatedUserReq = await request.get(`/api/users/${id}`);

    expect(updatedUserReq.status).toBe(200);
    expect(updatedUserReq.body).toEqual({ id, ...updatedUser });

    //delete user
    const deleteReq = await request.delete(`/api/users/${id}`);

    expect(deleteReq.status).toBe(204);

    //check deleted user by id
    const deletedUserReq = await request.get(`/api/users/${id}`);

    expect(deletedUserReq.status).toBe(404);
  });
});
