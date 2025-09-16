"use client";
import React, { FormEvent, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { toast } from "react-toastify";

type Message = {
  messageId: string;
  chatId: string;
  userId: string;
  content: string;
};

const InputMessage = ({
  socketRef,
  chatId,
  fromId,
  toId,
  setCurrent,
}: {
  setCurrent: React.Dispatch<SetStateAction<Message[]>>;
  socketRef: React.RefObject<WebSocket | null>;
  fromId: string;
  toId: string;
  chatId: string;
}) => {
  if (socketRef === null) return;
  const [message, setMessage] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("message, userId, chatId: ", message, fromId, chatId);
    // if (message === "" || userId === "123" || chatId === "default") {
    //   toast.error("Type something...");
    //   return;
    // }
    // testing purpose
    if (message === "") {
      toast.error("Type something...");
      return;
    }
    socketRef.current?.send(
      JSON.stringify({
        message: message,
        chatId: chatId,
        fromId: fromId,
        toId: toId,
      })
    );
    setCurrent((prev) => [
      ...prev,
      {
        chatId: chatId,
        content: message,
        messageId: Date.now().toString() + fromId.slice(0, 5),
        userId: fromId,
      },
    ]);
    setMessage("");
  };
  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className="w-full"
        />
      </form>
    </div>
  );
};

export default InputMessage;
