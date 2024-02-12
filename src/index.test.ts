import supertest from 'supertest';
import { server } from './index';
import { ERROR_MESSAGES } from './constants';

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

const fakeUser = {
  username: 21,
  age: 'fresh and young',
  hobbies: 'dancing',
};

const fakeId = 12345;
const fakeUuid = '11111111-1111-1111-1111-111111111111';

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

  test('should perform error messages with incorrect requests', async () => {
    //incorrect url
    const res = await request.get('/api/books');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: ERROR_MESSAGES.pageNotFound });

    //incorrect id (not uuid)

    const fakeIdReq = await request.get(`/api/users/${fakeId}`);

    expect(fakeIdReq.status).toBe(400);
    expect(fakeIdReq.body).toEqual({ message: ERROR_MESSAGES.invalidId });

    //nonexistent user
    const createReq = await request.post('/api/users').send(JSON.stringify(mockUser));

    expect(createReq.status).toBe(201);

    const fakeUuidReq = await request.get(`/api/users/${fakeUuid}`);

    expect(fakeUuidReq.status).toBe(404);
    expect(fakeUuidReq.body).toEqual({ message: ERROR_MESSAGES.userNotFound });

    //creating user with invalid request body
    const createFakeUserReq = await request.post('/api/users').send(JSON.stringify(fakeUser));

    expect(createFakeUserReq.status).toBe(400);
    expect(createFakeUserReq.body).toEqual({ message: ERROR_MESSAGES.invalidFields });
  });

  test('should perform error while updating nonexistent user', async () => {
    const res = await request.get('/api/users');
    expect(res.status).toBe(200);

    const createReq = await request.post('/api/users').send(JSON.stringify(mockUser));
    expect(createReq.status).toBe(201);

    const { id } = createReq.body;
    const userByIdReq = await request.get(`/api/users/${id}`);
    expect(userByIdReq.status).toBe(200);
    expect(userByIdReq.body).toEqual({ id, ...mockUser });

    const updateReq = await request.put(`/api/users/${fakeUuid}`).send(JSON.stringify({ id, ...updatedUser }));
    expect(updateReq.status).toBe(404);
    expect(updateReq.body).toEqual({ message: ERROR_MESSAGES.userNotFound });
  });
});
