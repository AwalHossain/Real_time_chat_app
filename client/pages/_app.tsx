import type { AppProps } from "next/app";
import SocketProvider from "../context/Socket.context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
  );
}

export default MyApp;
