"use client";
import {
  useAddMessageMutation,
  useGetChatQuery,
  useGetMessagesQuery,
} from "@/app/redux/features/inbox/inboxApi";
import { useSocket } from "@/components/Context/SocketProvider";
import MessageCart from "@/components/Inbox/Message/MessageCart";
import { imageBaseUrl } from "@/lib/constant";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { GrAttachment, GrEmoji } from "react-icons/gr";
import { IoIosArrowBack, IoMdSend } from "react-icons/io";
import MessageCartSkeleton from "@/components/Inbox/Message/MessageCartSkeleton";
import { FaXmark } from "react-icons/fa6";
import CustomOfferModal from "./CustomOfferModal";
import { useGetAllGigUserQuery } from "@/app/redux/features/getAllGigForUserApi";
import useUser from "@/hooks/useUser";
import AllGigsModal from "./AllGigsModal";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "@/app/redux/features/inbox/userToChatSlice";

const Message = () => {
  const user = useUser();
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isAllGigsModalOpen, setIsAllGigsModalOpen] = useState(false);
  const [selectedGig, setSelectedGig] = useState(null);
  const [page, setPage] = useState(1);
  const [attachments, setAttachments] = useState([]);
  const lastMessageRef = useRef();
  const { socket } = useSocket();
  const { data: participant } = useGetChatQuery(chatId);
  const dispatch = useDispatch();
  const { data } = useGetAllGigUserQuery(user?.id, {
    skip: !user?.id,
  });
  const {
    data: messageData,
    isFetching,
    isError,
    error,
  } = useGetMessagesQuery({
    chatId,
    page,
  });
  const [addMessage] = useAddMessageMutation();
  const allGig = data?.data?.attributes?.results;

  const {
    id: receiverId,
    fullName,
    image,
    role,
    online,
  } = participant?.participants[0] || {};

  useEffect(() => {
    if (messageData) {
      setMessages(messageData.data);
    }
  }, [messageData]);

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      };
      socket.on("new-message", handleNewMessage);

      return () => {
        socket.off("new-message", handleNewMessage);
      };
    }
  }, [socket]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prevAttachments) => [...prevAttachments, ...files]);
  };

  const handleRemoveAttachment = (index) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = e.target.message.value.trim();

    if (!message && attachments.length === 0) {
      return; // If both are empty, don't send anything
    }

    const formData = new FormData();
    formData.append("receiver", receiverId);
    if (message) {
      formData.append("message", message);
    }

    attachments.forEach((file) => {
      formData.append("files", file);
    });

    const res = await addMessage(formData);
    if (res?.data) {
      setAttachments([]);
      e.target.message.value = "";
    }
  };

  const handleSubmitOffer = async (values) => {
    const offerDetails = JSON.stringify({
      gigId: selectedGig._id,
      clientId: receiverId,
      freelancerId: user?.id,
      gigTitle: selectedGig?.title,
      slug: selectedGig?.slug,
      ...values,
    });
    const formData = new FormData();
    formData.append("receiver", receiverId);
    formData.append("offerDetails", offerDetails);
    const res = await addMessage(formData);
    if (res.error) {
      toast.error(res.error.message);
    }
    setIsOfferModalOpen(false);
  };

  const closeOfferModal = () => {
    setSelectedGig(null);
    setIsOfferModalOpen(false);
  };
  const openAllGigsModal = () => {
    setIsAllGigsModalOpen(true);
  };

  // Function to close the all gigs modal
  const closeAllGigsModal = () => {
    setIsAllGigsModalOpen(false);
  };

  // Function to handle gig selection
  const handleGigSelect = (gig) => {
    setSelectedGig(gig);
    setIsAllGigsModalOpen(false);
    setIsOfferModalOpen(true);
  };

  let content;
  if (isFetching) {
    content = (
      <>
        <MessageCartSkeleton />
        <MessageCartSkeleton />
        <MessageCartSkeleton />
      </>
    );
  } else if (isError && error) {
    content = (
      <h3 className="font-semibold text-rose-500 text-center py-5">
        Something went wrong
      </h3>
    );
  } else if (!isFetching && messages?.length === 0) {
    content = (
      <h3 className="font-semibold text-gray-500 text-center py-5">
        No messages found
      </h3>
    );
  } else {
    content = messages.map((message, i) => (
      <div key={i} ref={i === messages.length - 1 ? lastMessageRef : null}>
        <MessageCart message={message} />
      </div>
    ));
  }

  return (
    <div>
      <div
        className={`w-full flex items-center p-3 bg-white border rounded-t-xl gap-4`}
      >
        <div className="flex items-center gap-2">
          <button
            className="block md:hidden"
            onClick={() => dispatch(setIsOpen())}
          >
            <IoIosArrowBack className="text-2xl" />
          </button>
          {user?.role === "buyer" ? (
            <Link href={`/freelancer-details?id=${receiverId}`}>
              <div className="relative w-14 h-14 rounded-full">
                <Image
                 fill
                  className="rounded-full absolute"
                  src={image ? `${imageBaseUrl}${image}` : ""}
                  alt="User Image"
                />
                {online && (
                  <div className="absolute right-2 bottom-0.5 w-2.5 h-2.5 rounded-full bg-green-500 ring-1 ring-white" />
                )}
              </div>
            </Link>
          ) : (
            <div className="relative w-14 h-14 rounded-full">
              <Image
                fill
                className="rounded-full absolute"
                src={image ? `${imageBaseUrl}${image}` : ""}
                alt="User Image"
              />
              {online && (
                <div className="absolute right-2 bottom-0.5 w-2.5 h-2.5 rounded-full bg-green-500 ring-1 ring-white" />
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg">
            {fullName || "Unknown User"}
          </h1>
        </div>
      </div>
      <div className="p-2 bg-[#e6f9ef] rounded-b-xl">
        <div className="w-full h-[calc(100vh-350px)] md:h-[calc(100vh-410px)] overflow-y-scroll">
          {content}
        </div>

        <form onSubmit={handleSubmit} className="w-full bg-white rounded-xl">
          <textarea
            name="message"
            className="w-full p-3 rounded-xl text-gray-800 resize-none"
            placeholder="Type your message..."
          />
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 p-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 border rounded-lg"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Attachment"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-1 bg-[#E6F9EF] text-red-500 rounded-full p-1"
                    onClick={() => handleRemoveAttachment(index)}
                  >
                    <FaXmark className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <hr className="-mt-1" />
          <div className="flex justify-between items-center p-2">
            <div className="flex items-center gap-5 text-gray-600">
              <GrEmoji className="text-xl" />
              <label htmlFor="file">
                <GrAttachment className="text-xl cursor-pointer" />
              </label>
              {user?.role === "freelancer" && (
                <button
                  onClick={openAllGigsModal}
                  className="px-5 py-1.5 bg-green-500 text-white rounded"
                >
                  Create an Offer
                </button>
              )}
              <input
                type="file"
                id="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white rounded-full p-2 flex items-center justify-center"
            >
              <IoMdSend className="text-xl" />
            </button>
          </div>
        </form>
      </div>
      <AllGigsModal
        isOpen={isAllGigsModalOpen}
        gigs={allGig}
        onClose={closeAllGigsModal}
        onSelectGig={handleGigSelect}
      />
      <CustomOfferModal
        isOpen={isOfferModalOpen}
        handleSubmitOffer={handleSubmitOffer}
        gig={selectedGig}
        onClose={closeOfferModal}
      />
    </div>
  );
};

export default Message;
