const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

const { Server } = require("socket.io");

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  
  // Broadcast to all clients
  io.sockets.emit("broadcast", "A new user has joined the chat");


  // Broadcast to all clients except the sender
  socket.broadcast.emit("broadcastWithoutHim", "A new user has joined the chat");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(port, () => {
  console.log(`Server running at port ` + port);
});
