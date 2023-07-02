import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const http = require('http');

const hostname = '127.0.0.1';
const port = process.env.PORT;

const server = http.createServer((_req: Request, res: Response) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
