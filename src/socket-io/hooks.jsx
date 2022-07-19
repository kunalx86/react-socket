import { useState, useCallback, useEffect } from "react";
import io from "socket.io-client";

function useSocketIO(email) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!email) {
      socket.close();
      return;
    }
    setSocket(io.connect("https://pdhkwy.sse.codesandbox.io/", {
      host: "https://pdhkwy.sse.codesandbox.io/",
      port: 443,
      extraHeaders: {
        "Access-Control-Allow-Origin": "http://localhost:5173",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE, PREFETCH"
      },
      auth: {
        name: email,
      },
      autoConnect: true,
      rejectUnauthorized: false
    }));
  }, [email]);

  return socket
}

function useSocketMessages(email) {
  const socket = useSocketIO(email)
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [joinedRoom, setJoinedRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([]);
    if (!socket) {
      console.log("null", socket)
      return;
    }
    socket.on("connect_failed", () => {
      console.error("Error");
    })
    socket.connect();
    console.log(socket);
    window.socket = socket;

    socket.on("initData", ({ online, room }) => {
      setJoinedRoom(room);
      setOnlineUsers([...online.users]);
    })

    socket.on("recv", ({ msg, name }) => {
      setMessages(prevMsgs => [...prevMsgs, { msg, name }])
    })

    socket.on("joined", ({ userName }) => {
      setOnlineUsers(prevUsers => [...prevUsers, userName]);
    })

    socket.on("left", ({ userName }) => {
      setOnlineUsers(prevUsers => [...prevUsers.filter(user => user !== userName)]);
    })

    return () => {
      socket.off("initData");
      socket.off("joined");
      socket.off("left");
      socket.close();
    }
  }, [socket]);

  const joinRoom = useCallback((room) => {
    console.log("join room", room)
    socket.emit("create", { room });
  }, [socket]);

  const sendMsg = useCallback((msg) => {
    socket.emit("send", { msg });
  }, [socket]);

  return {
    onlineUsers,
    joinedRoom,
    joinRoom,
    messages,
    sendMsg
  }
}

export default useSocketMessages;