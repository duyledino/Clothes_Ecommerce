import { WebSocket } from "ws";
import { v4 } from "uuid";

const broadcastToUser = (chats, chatId, userId, message) => {
  // this never exists for the first time
  const socket = chats[userId];
  if (!socket || socket.readyState !== WebSocket.OPEN) return;

  console.log("ws send: ", message, userId, chatId);
  socket.send(
    JSON.stringify({ messageId: v4(), message, userId, chatId })
  );
};

export { broadcastToUser };
