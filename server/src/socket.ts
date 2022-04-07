import { Server, Socket } from "socket.io";
import logger from "./utils/logger";

function socket({ io }: { io: Server }) {
  logger.info(`Socket is enabled`);

  io.on("connection", (socket: Socket) => {
    logger.info(`User connected ${socket.id}`);
  });
}

export default socket;
