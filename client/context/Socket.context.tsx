import { createContext, useContext, useState } from "react";
import io, { Socket } from "socket.io-client";
import { socket_url } from "../config/default";

const socket = io(socket_url);

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  rooms: object;
  roomId?: string;
}

const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  rooms: {},
});

function SocketProvider(props: any) {
  const [username, setUsername] = useState("");
  const [rooms, setRooms] = useState({});
  const [roomId, setRoomId] = useState("");
  return (
    <SocketContext.Provider
      value={{ socket, username, setUsername, rooms, roomId }}
      {...props}
    />
  );
}

export const useScoket = () => useContext(SocketContext);

export default SocketProvider;
