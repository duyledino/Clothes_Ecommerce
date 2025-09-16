"use client";
import React, { useEffect, useRef, useState } from "react";
import ChatSidebar from "@/components/guest/ChatSidebar";
import ChatMessageArea from "@/components/guest/ChatMessageArea";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { toast } from "react-toastify";
import { fetchChatsByUserId } from "@/slice/ChatSlice";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
};

type Chat = {
  chatId: string;
  toUser: User;
  fromUser: User;
};

type Message = {
  messageId: string;
  chatId: string;
  //fromUserID
  userId: string;
  content: string;
};

function Page() {
  const router = useRouter();
  const socketRef = useRef<WebSocket | null>(null);
  const dispatch = useAppDispatch();
  const { chats } = useAppSelector((state) => state.ChatSlice);
  const [localStore, setLocalStore] = useState<string | null>(null);

  const [current, setCurrent] = useState<Message[]>([]);
  const [singleChat, setSingleChat] = useState<Chat>(() => {
    if (chats && chats?.length > 0) return chats[0];
    return {
      chatId: "default",
      toUser: {
        email: "temp@gmail.com",
        id: "123",
        name: "temp",
      },
      fromUser: {
        email: "temp@gmail.com",
        id: "123",
        name: "temp",
      },
    };
  });
  useEffect(() => {
    if (localStore) {
    //   if (!JSON.parse(localStore).admin) {
    //     router.push("/");
    //     return;
    //   }
      const { token, id } = JSON.parse(localStore);
      dispatch(fetchChatsByUserId({ token, userId: id }));
    }
  }, [localStore]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      setLocalStore(storedUser);
    }
    socketRef.current = new WebSocket("ws://localhost:3500");
    socketRef.current.onopen = () => {
      console.log("✅Client websocket is connected");
    };
    socketRef.current.onmessage = (e) => {
      console.log("received from server: ", e.data);
      const { messageId, message, fromId, chatId } = JSON.parse(e.data);
      setCurrent((prev) => [
        ...prev,
        { messageId: messageId, content: message, userId: fromId, chatId },
      ]);
    };
    socketRef.current.onclose = (e) => {
      console.log("Websocket is closed");
    };
    socketRef.current.onerror = (e) => {
      console.error("websocket error: ", e);
    };
    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  useEffect(() => {
    if (chats) {
      setSingleChat(chats[0]);
    }
  }, [chats]);
  useEffect(() => {
    if (singleChat && socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current?.send(
        JSON.stringify({ type: "register", fromId: singleChat.fromUser.id })
      );
    }
  }, [singleChat, socketRef.current?.OPEN]);
  console.log("chats: ", chats);
  console.log("currnet: ", current);
  return (
    <div className="flex flex-1 h-[81.5vh] bg-white text-gray-900 border-b-2">
      <ChatSidebar
        chats={chats || []}
        setSingleChat={setSingleChat}
        singleChat={singleChat}
      />
      {singleChat.chatId !== "default" && localStore ? (
        <ChatMessageArea
          localStore={localStore}
          setCurrent={setCurrent}
          current={current}
          socketRef={socketRef}
          fromId={singleChat ? singleChat.fromUser.id : "123"}
          toId={singleChat ? singleChat.toUser.id : "123"}
          chatId={singleChat.chatId}
        />
      ) : (
        <ChatMessageArea
          localStore={localStore}
          setCurrent={setCurrent}
          current={[]}
          socketRef={socketRef}
          fromId={singleChat.fromUser.id}
          toId={singleChat.toUser.id}
          chatId={singleChat.chatId}
        />
      )}
    </div>
  );
};

export default Page;
