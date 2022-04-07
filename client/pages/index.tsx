import type { NextPage } from "next";
import { useRef } from "react";
import Message from "../container/Message";
import Rooms from "../container/Rooms";
import { useScoket } from "../context/Socket.context";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { socket, username, setUsername } = useScoket();
  const usernameRef = useRef<HTMLInputElement>(null);
  function handleSetUserName() {
    const value = usernameRef.current?.value;
    console.log("clicke", value);

    if (!value) {
      return;
    }

    setUsername(value);
    localStorage.setItem("username", value);
  }
  return (
    <div>
      <h2>Socket id</h2>
      {socket.id}
      {!username && (
        <div className={styles.usernameWrapper}>
          <div className={styles.usernameInner}>
            <input
              ref={usernameRef}
              type="text"
              placeholder="Enter your username"
            />
            <button onClick={handleSetUserName}>Submit</button>
          </div>
        </div>
      )}

      {username && (
        <div className={styles.container}>
          <Rooms />
          <Message />
        </div>
      )}
    </div>
  );
};

export default Home;
