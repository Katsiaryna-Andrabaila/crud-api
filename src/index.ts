import { Request, Response } from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from './controllers';
import { getBody, isBodyValid } from './utils';
import { ERROR_MESSAGES, URL_REG_EXP, UUID_REG_EXP } from './constants';
import * as dotenv from 'dotenv';
dotenv.config();

const http = require('http');

const hostname = '127.0.0.1';
const port = process.env.PORT;

const server = http.createServer(async (req: Request, res: Response) => {
  try {
    if ((req.url === '/api/users' || req.url === '/api/users/') && req.method === 'GET') {
      const users = await getUsers();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(users));
    } else if (req.url.match(URL_REG_EXP) && req.method === 'GET') {
      const id = req.url.split('/')[2];
      const user = await getUserById(id);

      if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      } else if (id.match(UUID_REG_EXP)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: ERROR_MESSAGES.userNotFound }));
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: ERROR_MESSAGES.invalidId }));
      }
    } else if ((req.url === '/api/users' || req.url === '/api/users/') && req.method === 'POST') {
      const body = await getBody(req);
      const newUser = await createUser(JSON.parse(body));

      if (isBodyValid(newUser)) {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: ERROR_MESSAGES.invalidFields }));
      }
    } else if (req.url.match(URL_REG_EXP) && req.method === 'PUT') {
      const id = req.url.split('/')[2];

      const updatedUser = await getUserById(id);

      if (updatedUser) {
        const body = await getBody(req);
        const result = await updateUser(id, JSON.parse(body));
        res.writeHead(200, { 'Content-Type': 'application/json' });

        res.end(JSON.stringify(result));
      } else if (id.match(UUID_REG_EXP)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: ERROR_MESSAGES.userNotFound }));
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: ERROR_MESSAGES.invalidId }));
      }
    } else if (req.url.match(URL_REG_EXP) && req.method === 'DELETE') {
      const id = req.url.split('/')[2];

      const deletedUser = await deleteUser(id);

      if (deletedUser) {
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ deletedUser }));
      } else if (id.match(UUID_REG_EXP)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: ERROR_MESSAGES.userNotFound }));
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: ERROR_MESSAGES.invalidId }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: ERROR_MESSAGES.pageNotFound }));
    }
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: `${(e as Error).message} ${ERROR_MESSAGES.server}`,
      })
    );
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
