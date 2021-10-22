require("dotenv").config({ path: "../.env" });

const express = require("express");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const PORT = process.env.PORT || 9000;

//Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.warn(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();

  const router = require("./router");

  app.use("/", router);

  app.listen(PORT, () => {
    console.warn(
      `Node cluster worker ${process.pid}: listening on port ${PORT}`
    );
  });
}
