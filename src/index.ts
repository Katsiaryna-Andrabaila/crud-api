import { Request, Response } from 'express';

const http = require('http');

const hostname = '127.0.0.1';
const port = 4000;

const server = http.createServer((_req: Request, res: Response) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
