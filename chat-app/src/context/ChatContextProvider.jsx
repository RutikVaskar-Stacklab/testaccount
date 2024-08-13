import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import ChatContext from "./chatContext";

const ChatContextProvider = ({ children }) => {
  const [addUsers, setUsers] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [roomID, setRoomID] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const messageDiv = useRef(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:5000");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      const name = prompt("Enter your name to join");
      socketInstance.emit("new-user-joined", name);
    });

    socketInstance.on("allUsers", (users) => {
      const usersArray = Object.entries(users).map(([id, name]) => ({
        id: id,
        name: name,
      }));
      setUsers(usersArray);
    });

    socketInstance.on("allRooms", (users) => {
      const roomsArray = Object.entries(users).map(([id, name]) => ({
        id: id,
        name: name,
      }));
      setAllRooms(roomsArray);
    });

    socketInstance.on("receive-message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
        // Send message along with the target user's ID
        socket.emit("send-message", { message, targetUserId: currentUser });
        setMessages((prevMessages) => [
            ...prevMessages,
            { user: "You", message: message, sender: "me", type:currentUser?"private":"public" },
        ]);
        setMessage("");
    }
};

  const joinRoom = () => {
     if(roomID === ""){
    alert("enter room name or ID first")
   }
    if (socket && roomID.trim() !== "") {
      setCurrentUser(null)
      socket.emit("create", roomID);
      setRoomID("");
    }
  };

  const leaveRoom = () => {
  //  if(roomID === ""){
  //   alert("enter room name or ID first")
  //  }
    if (socket) {
      socket.emit("leave", roomID);
      setRoomID("");
    }
   
  };

  const Disconnect = () => {
    if (socket) {
      socket.disconnect();
    }
  };

  console.log(socket?.id)

  return (
    <ChatContext.Provider
      value={{
        addUsers,
        allRooms,
        message,
        socket,
        roomID,
        messages,
        messageDiv,
        currentUser,
        setMessage,
        setRoomID,
        sendMessage,
        joinRoom,
        leaveRoom,
        Disconnect,
        setCurrentUser
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
