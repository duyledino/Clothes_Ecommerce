import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

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

const ChatSidebar = ({
  chats,
  singleChat,
  setSingleChat,
}: {
  chats: Chat[];
  singleChat: Chat;
  setSingleChat: Dispatch<SetStateAction<Chat>>;
}) => {
  const [click, setClick] = useState<string>("");
  useEffect(() => {
    if (click !== "") {
      const foundChat = chats.find((item) => item.chatId === click);
      if (foundChat) {
        setSingleChat(foundChat);
      }
    }
  }, [click]);
  return (
    <div className="md:w-64 w-32 border-r border-gray-200">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">Users</h2>
        <ul className="md:w-full flex flex-col gap-2.5">
          {chats.length > 0
            ? chats.map((item) => (
                <li
                  onClick={() => setClick(item.chatId)}
                  key={item.chatId}
                  className={`cursor-pointer p-3 text-center overflow-hidden md:w-full sm:w-full md:text-[16px] text-[12px] ${
                    singleChat.chatId === item.chatId
                      ? "text-white bg-gray-900"
                      : "text-gray-400 bg-gray-100"
                  } `}
                >
                  {item.toUser.name === "" || item.toUser.name === null
                    ? item.toUser.email
                    : item.toUser.name}
                </li>
              ))
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default ChatSidebar;
