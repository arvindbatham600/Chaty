const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

const server = require("http").createServer(app);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

const io = require("socket.io")(server);

io.on("connection", (socket) => {
    // console.log('a user connected');
    socket.on("message", (msg) => {
        // console.log(msg);
        socket.broadcast.emit("message", msg);
    })
});
