import cors from "cors";
import "dotenv/config";
import express from "express";
import user from "./route/userRoute.js";
import order from "./route/orderRoute.js";
import product from "./route/productRoute.js";
import payment from "./route/paymentRoute.js";
import cart from "./route/cartRoute.js";
import tryon from "./route/tryonRoute.js";
import track from "./route/trackRoute.js";
import review from "./route/reviewRoute.js";
import chat from "./route/chatRoute.js";
import { WebSocketServer } from "ws";
import {
  createMessage,
  createMessageWebsoket,
} from "./controller/chat/controller.js";
import { broadcastToUser } from "./util/socket.js";

const app = express();

const port = process.env.PORT || 3500;

app.use(express.json());
app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"], // Specify headers explicitly
    credentials: true, // Optional: if you're using cookies or auth headers
    origin: `${process.env.client_Url}`,
  })
);

user(app);
order(app);
payment(app);
cart(app);
product(app);
tryon(app);
track(app);
review(app);
chat(app);

app.get("/", (req, res) => {
  res.send("hello world !");
});

const server = app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});

const wss = new WebSocketServer({ server });

const chats = {};

wss.on("connection", (ws) => {
  let user = null;
  console.log("✅ Client connected. 1 User is connected");
  ws.on("error", (err) => {
    console.error("❌Failed to connect websocket:\n", err);
  });
  ws.on("message", async function (data) {
    const parsedData = JSON.parse(data);
    //register for the very first time
    if (parsedData.type === "register") {
      const { fromId } = parsedData;
      chats[fromId] = ws;
      console.log("✅ Register for message");
      return;
    }
    //this is toId
    const { message, chatId, fromId, toId } = parsedData;
    if (!chats[fromId]) chats[fromId] = ws;
    // if(!chats[toId]) chats[toId] = ws;
    console.log("received:", parsedData);
    user = { userId: fromId };
    try {
      //send to specific userId
      //dont need to use Set because this application doesn't support chat room
      // NOTE: nothing is gonna send for the very first time
      broadcastToUser(chats, chatId, toId, message);
      //NOTE: then save to database
      await createMessageWebsoket(parsedData);
    } catch (err) {
      console.error("❌ Error handling message:", err);
      ws.send(
        JSON.stringify({ error: "Invalid message format or server error." })
      );
    }
  });
  ws.on("close", () => {
    if (user && chats[user]) {
      delete chats[user.userId];
      console.log(`❌ User ${user.userId} disconnected`);
    }
  });
});
