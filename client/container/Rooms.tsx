import React, { useRef } from "react";
import EVENTS from "../config/events";
import { useScoket } from "../context/Socket.context";
import styles from "../styles/Room.module.css";
interface MutableRefObject<T> {
  current: T;
}

function Rooms() {
  const { socket, rooms, roomId } = useScoket();

  const newRoomRef = useRef<HTMLInputElement>(null);

  function handleCreateRoom() {
    const roomName = newRoomRef?.current?.value || "";

    if (!String(roomName).trim()) return;
    console.log(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    // emit room created evvent
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    // newRoomRef.current.value = "kamal";
    console.log(rooms);
  }

  function handleJoinRoom(key: string) {
    if (key === roomId) return;

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }

  return (
    <nav className={styles.wrapper}>
      <div className={styles.createRoomWrapper}>
        <input type="text" ref={newRoomRef} placeholder="Room name" />
        <button className="cta" onClick={handleCreateRoom}>
          Create Room
        </button>
      </div>

      <ul className={styles.roomList}>
        {Object.keys(rooms).map((key) => {
          return (
            <div key={key}>
              <button
                disabled={key === roomId}
                title={`Join ${rooms[key].name}`}
                onClick={() => handleJoinRoom(key)}
              >
                {rooms[key].name}
              </button>
            </div>
          );
        })}
      </ul>
    </nav>
  );
}

export default Rooms;
