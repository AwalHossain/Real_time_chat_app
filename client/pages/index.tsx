import type { NextPage } from "next";
import { useScoket } from "../context/Socket.context";

const Home: NextPage = () => {
  const { socket } = useScoket();
  return (
    <div>
      <h2>Socket id</h2>
      `${socket.id}`
    </div>
  );
};

export default Home;
