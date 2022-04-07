import { createContext, useContext } from "react";
import io from "socket.io-client";
import { socket_url } from "../config/default";

const socket = io(socket_url);

const SocketContext = createContext({ socket });

function SocketProvider(props: any) {
  return <SocketContext.Provider value={{ socket }} {...props} />;
}

export const useScoket = () => useContext(SocketContext);

export default SocketProvider;
