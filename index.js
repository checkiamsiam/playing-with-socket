const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

const { Server } = require("socket.io");

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  // using built in event
  socket.send("Hello from server");
  //using custom event
  setInterval(() => {
    socket.emit("sendData", {message: "Hello from server custom event"});
  }, 2000);

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
