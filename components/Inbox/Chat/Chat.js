"use client";
import { useGetChatsQuery } from "@/app/redux/features/inbox/inboxApi";
import { useSocket } from "@/components/Context/SocketProvider";
import React, { useEffect, useState } from "react";
import ChatCart from "./ChatCart";
import { IoSearch } from "react-icons/io5";
import noChat from "../../../assest/image/nochat.png";
import Image from "next/image";
import ChatCartSkeleton from "./ChatCartSkeleton ";
import { useSelector } from "react-redux";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const { data, isFetching, isError, error } = useGetChatsQuery({ refetchOnMountOrArgChange: true });
  const { socket } = useSocket();

  useEffect(() => {
    if (data) {
      setChats(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (socket) {
      const handleNewChat = (newChat) => {
        setChats((prevChats) => {
          const chatExists = prevChats.some((chat) => chat.chat.id === newChat.chat.id);
          if (chatExists) {
            return prevChats.map((chat) => chat.chat.id === newChat.chat.id ? { ...chat, lastMessage: newChat.lastMessage } : chat);
          } else {
            return [...prevChats, newChat];
          }
        });
      };
      socket.on("new-chat", handleNewChat);
      return () => socket.off("new-chat", handleNewChat);
    }
  }, [socket]);

  let content = null;
  if (isFetching) {
    content = <>{[...Array(5)].map((_, i) => <ChatCartSkeleton key={i} />)}</>;
  } else if (isError) {
    content = <h3 className="font-semibold text-rose-500 text-center py-5">Something went wrong</h3>;
  } else if (chats?.length === 0) {
    content = (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Image width={120} height={120} src={noChat} alt="No Chat" />
        <h1 className="text-xl font-bold mt-4">No Conversations found</h1>
      </div>
    );
  } else {
    content = chats.map((chat) => <ChatCart key={chat.id} chatData={chat} />);
  }
  return (
    <div className={`w-full  flex flex-col`}>
      <div className="w-full px-4 pb-2">
        <h1 className="text-xl font-semibold">Messages</h1>
        <div className="w-full px-3 py-2 rounded-full border flex text-gray-400 bg-white mt-3">
          <IoSearch className="text-xl" />
          <input type="text" className="w-full bg-transparent outline-none px-2" placeholder="Search..." />
        </div>
      </div>

      <div className="w-full h-[calc(100vh-200px)] md:h-[calc(100vh-290px)] overflow-y-scroll py-5 space-y-2 flex-grow">
        {content}
      </div>
    </div>
  );
};

export default Chat;
