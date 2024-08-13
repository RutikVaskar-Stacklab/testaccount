import React, { useContext } from "react";
import ChatContext from "./context/chatContext";
import Sidebar from "./components/Sidebar";

const App = () => {
  const {
    addUsers,
    message,
    setMessage,
    sendMessage,
    Disconnect,
    roomID,
    setRoomID,
    joinRoom,
    leaveRoom,
    messages,
    messageDiv,
  } = useContext(ChatContext);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="flex justify-center w-full min-h-screen items-center">
      <Sidebar />
      <main className="flex w-10/12 justify-center min-h-screen flex-col items-center" >
        <section className="border-4 p-4 w-3/4 h-96 border-slate-900 overflow-y-auto">
          <div className="message-cont relative box-border" ref={messageDiv}>
            {messages.length > 0 &&
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`w-full flex ${
                    msg.sender === "me"
                      ? "justify-end"
                      : msg.sender === "user"
                      ? "justify-start"
                      : "justify-center"
                  }`}
                >
                  <h1
                    className={`p-2 m-2 ${
                      msg.sender === "me"
                        ? "bg-red-500 text-white justify-end"
                        : msg.sender === "server"
                        ? "bg-white border-2 border-slate-600 text-slate-700"
                        : "bg-green-500"
                    } font-semibold rounded-xl max-w-fit ${
                     msg.type === "private"? "text-red-700": msg.type==="group"?"text-blue-800":"text-slate-700"}`}
                  >
                    {msg.user}: {msg.message}
                  </h1>
                </div>
              ))}
          </div>
        </section>
        <div className="flex items-center gap-6 w-4/6 mt-5">
          <input
            type="text"
            className="w-3/4 border-2 border-emerald-700 p-2 rounded-xl m-3"
            value={message}
            onChange={handleChange}
          />
          <button
            onClick={sendMessage}
            className="border-2 border-none bg-blue-500 text-white font-bold h-5/6 rounded-lg p-2 w-1/6"
          >
            Send
          </button>
          <button
            onClick={Disconnect}
            className="border-2 border-none bg-blue-500 text-white font-bold rounded-lg h-5/6 p-2 w-1/6"
          >
            Disconnect
          </button>
        </div>
        <div className="flex items-center gap-6 w-4/6 mt-5">
          <input
            type="text"
            className="w-3/4 border-2 border-emerald-700 p-2 rounded-xl m-3"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
            placeholder="Enter Room Name"
          />
          <button
            onClick={joinRoom}
            className="border-2 border-none bg-blue-500 text-white font-bold rounded-lg h-5/6 p-2 w-1/6"
          >
            Create/Join Room
          </button>
          <button
            onClick={leaveRoom}
            className="border-2 border-none bg-blue-500 text-white font-bold rounded-lg h-5/6 p-2 w-1/6"
          >
            Leave Room
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;
