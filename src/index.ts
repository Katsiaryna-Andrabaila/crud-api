import { server } from './serverConfig';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
