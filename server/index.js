const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { instrument } = require("@socket.io/admin-ui");

const app = express();
const port = process.env.PORT || 8000;
app.use(cors());

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const io = require("socket.io")(5000, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const users = {};
const rooms = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;
    io.emit("allUsers", users);
    io.emit("allRooms", rooms);

    socket.broadcast.emit("receive-message", {
      user: "new-user-joined",
      message: users[socket.id],
      sender: "server",
    });
  });

  socket.on("create", (room) => {
    socket.join(room);
    rooms[socket.id] = room;
    io.emit("allRooms", rooms);
    console.log(`Socket ${socket.id} joined room ${room}`);
    io.emit("receive-message", {
      user: "Server",
      message: `User :${users[socket.id]}  joined room : ${rooms[socket.id]}  with id: ${socket.id}  `,
      sender: "server",
    });
  });

  socket.on("leave", (room) => {
    socket.leave(room);
    roomName = rooms[socket.id]
    delete rooms[socket.id];
    io.emit("allRooms", rooms);
    socket.emit("receive-message", {
      user: "Server",
      message: ` User: ${users[socket.id]} Left room: ${roomName}  with id: ${socket.id} `,
      sender: "server",
    });
  });

  socket.on("send-message", ({ message, targetUserId }) => {
    // Send message to a specific client
    if (targetUserId) {
        socket.to(targetUserId).emit("receive-message", {
            user: users[socket.id], // or however you get the user name
            message: message,
            sender: "user",
            type:"private"
        });
    } else {
        // Fallback to broadcast or room-based messaging
        const room = rooms[socket.id];
        if (room) {
            socket.to(room).emit("receive-message", {
                user: users[socket.id],
                message: message,
                sender: "user",
                type:"group"
            });
        } else {
            socket.broadcast.emit("receive-message", {
                user: users[socket.id],
                message: message,
                sender: "user",
                type:"public"
            });
        }
    }
});


  socket.on("disconnect", () => {
    const room = rooms[socket.id];
    socket.broadcast.emit("receive-message", {
      user: "user left the chat",
      message: users[socket.id],
      sender: "server",
    });
    delete users[socket.id];
    delete rooms[socket.id];
    io.emit("allUsers", users);
  });
});

app.get("/check", (req, res) => {
  res.send("working");
});

app.get("/allUsers", (req, res) => {
  res.send(users);
});

app.get("/allRooms", (req, res) => {
  res.send(rooms);
});

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";

mongoose
  .connect(DATABASE_URL)
  .then(() =>
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    })
  )
  .catch((err) => console.log(err.message));

instrument(io, {
  auth: false,
});
