console.log("hleolaf");

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

httpServer.listen(4000, () => {
  console.log(`This app is running on 4000`);
  // sock;
});
