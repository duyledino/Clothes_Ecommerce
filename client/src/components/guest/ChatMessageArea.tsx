import React, { SetStateAction, useEffect, useRef, useState } from "react";
import InputMessage from "./InputMessage";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getAllMessageFromChat } from "@/slice/ChatSlice";
import { toast } from "react-toastify";
import Loading from "../ui/Loading";

type Message = {
  messageId: string;
  chatId: string;
  userId: string;
  content: string;
};

const ChatMessageArea = ({
  socketRef,
  chatId,
  fromId,
  toId,
  current,
  setCurrent,
  localStore,
}: {
  localStore: string | null;
  setCurrent: React.Dispatch<SetStateAction<Message[]>>;
  socketRef: React.RefObject<WebSocket | null>;
  fromId: string;
  toId: string;
  chatId: string;
  current: Message[];
}) => {
  const firstRef = useRef(0);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const dispatch = useAppDispatch();
  const { messages, loadingChat } = useAppSelector((state) => state.ChatSlice);

  useEffect(() => {
    if (chatId !== "default" && toId !== "123") {
      const localStore = localStorage.getItem("user");
      if (localStore === undefined || localStore === null) {
        toast.error("No token");
        return;
      }
      const token = JSON.parse(localStore).token;
      dispatch(getAllMessageFromChat({ token, chatId: chatId }));
    }
  }, [chatId]);
  useEffect(() => {
    if (messageRef.current && localStore) {
      if (firstRef.current === 0) {
        firstRef.current = firstRef.current + 1;
        messageRef.current.scrollIntoView({
          behavior: "smooth",
        });
      } else if (
        current.length > 0 &&
        current[current.length - 1].userId === JSON.parse(localStore).id
      ) {
        messageRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [messages, current]);
  console.log(
    "message, from id, localStorage: ",
    chatId,
    fromId,
    localStore === null ? "undefined" : JSON.parse(localStore).id
  );
  return (
    <>
      {(loadingChat || localStore === null) && <Loading />}
      <div className="flex-1 p-4 flex flex-col">
        <div className="text-lg font-semibold mb-2">Chat</div>
        <div className="overflow-y-scroll flex-1 flex flex-col items-start gap-3 px-2">
          {messages && messages.length > 0
            ? messages.map((item) => (
                <p
                  ref={messageRef}
                  className={`rounded-3xl md:text-[18px] text-[12px] ${
                    localStore !== null &&
                    JSON.parse(localStore).id === item.userId
                      ? "self-end p-3 max-w-xs bg-gray-900 text-white"
                      : "p-3 max-w-xs bg-gray-300 text-gray-900"
                  }`}
                  key={item.messageId}
                >
                  {item.content}
                </p>
              ))
            : ""}
          {current && current.length > 0
            ? current.map((item) => (
                <p
                  className={`rounded-3xl md:text-[18px] text-[12px] ${
                    localStore !== null &&
                    JSON.parse(localStore).id === item.userId
                      ? "self-end p-3 max-w-xs bg-gray-900 text-white"
                      : "p-3 max-w-xs bg-gray-300 text-gray-900"
                  }`}
                  key={item.messageId}
                >
                  {item.content}
                </p>
              ))
            : ""}
        </div>
        <InputMessage
          setCurrent={setCurrent}
          socketRef={socketRef}
          chatId={chatId}
          fromId={fromId}
          toId={toId}
        />
      </div>
    </>
  );
};

export default ChatMessageArea;
