import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { socket_url } from "../config/default";
import EVENTS from "../config/events";

const socket = io(socket_url);

export interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  rooms: any;
  roomId?: string;
  messages?: any;
  setMessages: Function;
}

const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  setMessages: () => false,
  rooms: {},
});

function SocketProvider(props: any) {
  const [username, setUsername] = useState("");
  const [rooms, setRooms] = useState({});
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    window.onfocus = function () {
      document.title = "Chat app";
    };
  }, []);

  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);
  });

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    setRoomId(value);

    setMessages([]);
  });

  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
      if (!document.hasFocus()) {
        document.title = "NEw message ...";
      }

      setMessages((messages): any => [
        ...messages,
        { message, username, time },
      ]);
    });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        rooms,
        roomId,
        messages,
        setMessages,
      }}
      {...props}
    />
  );
}

export const useScoket = () => useContext(SocketContext);

export default SocketProvider;
