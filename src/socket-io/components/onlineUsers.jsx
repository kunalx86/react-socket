import useSocketMessages from "../hooks"
import { useAuth } from "../../auth";
import { useState } from "react";

function OnlineUsers() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const { onlineUsers, joinRoom, joinedRoom, messages, sendMsg } =
    useSocketMessages(user.email);
  return (
    <div>
      {onlineUsers.length} user(s) online
      {onlineUsers.map(user => (
        <div key={user}>
          {user}
        </div>
      ))}
      <div>
        <form onSubmit={e => {
          e.preventDefault();
          console.log("form submit", room);
          joinRoom(room);
        }}>
          <input 
            type="text"
            value={room}
            onChange={e => setRoom(e.target.value)}
          />
          <button type="submit">Join {room}</button>
        </form>
      </div>
      <div>
        {joinedRoom && `Joined ${joinedRoom}`}
      </div>
      <div>
        Messages:
        <div>
          {messages.map((msg, idx) => (
            <div key={idx}>
              {msg.msg} by {msg.name}
            </div>
          ))}
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
          <div>
            <button onClick={() => sendMsg(message)}>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnlineUsers;