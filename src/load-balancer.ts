import cluster from 'cluster';
import os from 'os';
import { server } from './serverConfig';
import * as dotenv from 'dotenv';

dotenv.config();

if (cluster.isPrimary) {
  console.log(`Master process ${process.pid} is running`);

  const cpusNumber = os.availableParallelism();
  let port = process.env.PORT;

  for (let i = 0; i < cpusNumber; i++) {
    port = `${+port! + 1}`;
    cluster.fork();
    process.env.PORT = port;
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker process ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  server.listen(process.env.PORT, () => {
    console.log(`Worker process ${process.pid} is listening on port ${process.env.PORT}`);
  });
}
