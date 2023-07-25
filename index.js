const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

const { Server } = require("socket.io");

const io = new Server(server);

const npsOne = io.of("/npsOne") ;
const npsTwo = io.of("/npsTwo") ;

npsOne.on("connection", (socket) => {
  console.log("a user connected to npsOne");
  
  socket.emit("message", "Hello from npsOne");

  socket.on("disconnect", () => {
    console.log("user disconnected from npsOne");
  });
});

npsTwo.on("connection", (socket) => {
  console.log("a user connected to npsTwo");
  
  socket.emit("message", "Hello from npsTwo");

  socket.on("disconnect", () => {
    console.log("user disconnected from npsTwo");
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(port, () => {
  console.log(`Server running at port ` + port);
});
