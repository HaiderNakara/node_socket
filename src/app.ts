import { createServer } from "http";
import { Server, Socket } from "socket.io";
import express from "express";
import { Message } from "./model/message";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

const httpServer = createServer(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const io = new Server(httpServer, {
  cors: { origin: "*" },
});
const PORT = process.env.PORT || 3000;
const mongo = process.env.mongo || "";
io.sockets.on("connection", (socket: Socket) => {
  const sender = socket.handshake.query.sender;
  const receiver = socket.handshake.query.receiver;

  socket.on("message", async (data) => {
    const messageg = new Message({
      message: data,
      member: [sender, receiver],
    });
    await messageg.save();
    const messages = await Message.find({
      timestamp: -1,
      member: [sender, receiver],
    });
    io.emit("message", messages);
  });
});
app.get("/", (req, res) => {
  res.send("hello World!");
});
mongoose.connect(mongo);
httpServer.listen(3000, () => {
  console.log(`Running on Port ${PORT}`);
});
