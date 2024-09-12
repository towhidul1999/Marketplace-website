"use client";
import {
  useGetBuyerOrderDetailsQuery,
  useUpdateBuyerOrderStatusMutation,
} from "@/app/redux/features/order/buyerOrderApi";
import {
  useGetOrderMessageQuery,
  useSendOrderMessageMutation,
} from "@/app/redux/features/orderMessage/orderMessage.api";
import { useSocket } from "@/components/Context/SocketProvider";
import useUser from "@/hooks/useUser";
import { imageBaseUrl } from "@/lib/constant";
import React, { useEffect, useState } from "react";
import formatTimestampMessage from "@/utils/formatTimestamp";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";
import { Image as AntdImage } from "antd";
import { toast } from "sonner";
const Activity = ({ orderId }) => {
  const [messages, setMessages] = useState([]);
  const { socket } = useSocket();
  const user = useUser();
  const { data: orderDetails } = useGetBuyerOrderDetailsQuery(orderId, {
    skip: !orderId,
  });
  const { data: messagesData } = useGetOrderMessageQuery(orderId);
  const [sendOrderMessage] = useSendOrderMessageMutation();
  const [updateOrder] = useUpdateBuyerOrderStatusMutation();
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState([]); // State for attachments

  useEffect(() => {
    if (messagesData?.attributes?.data) {
      setMessages(messagesData?.attributes?.data);
    }
  }, [messagesData]);

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (newMessage) => {
        if (newMessage?.orderId === orderId) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      };

      socket.on("new-order-message", handleNewMessage);

      return () => {
        socket.off("new-order-message", handleNewMessage);
      };
    }
  }, [socket, orderId]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prevAttachments) => [...prevAttachments, ...files]);
  };

  const handleRemoveAttachment = (index) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((_, i) => i !== index)
    );
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "" || attachments.length > 0) {
      const formData = new FormData();
      formData.append("orderId", orderId);
      formData.append("message", newMessage);
      {
        user?.role === "freelancer"
          ? formData.append("receiver", orderDetails?.clientId?.id)
          : formData.append("receiver", orderDetails?.freelancerId?.id);
      }
      attachments.forEach((file, index) => formData.append(`files`, file));

      const res = await sendOrderMessage(formData);
      if (res.error) {
        toast.error(res?.error?.data?.message);
      }
      if (res.data) {
        setNewMessage("");
        setAttachments([]);
      }
    }
  };

  const renderFilePreview = (file) => {
    const fileType = file.type.split("/")[0];

    if (fileType === "image") {
      return (
        <AntdImage
          width={96}
          height={96}
          src={URL.createObjectURL(file)}
          alt="Attachment"
          className="absolute rounded-md border transform group-hover:scale-105 transition-transform duration-200"
        />
      );
    } else if (file.type === "application/pdf") {
      return (
        <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-600">
          PDF
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-600">
          Attachment
        </div>
      );
    }
  };

  const renderMessageContent = (message) => {
    switch (message.content.messageType) {
      case "deliveryMessage":
        return (
          <div className="ml-14 mt-4 border p-3 rounded">
            <h1 className="uppercase font-semibold">Delivery</h1>
            <p className="text-gray-600 mt-2">
              {message.content.deliveryDetails.message}
            </p>
            <div className="mt-4 gap-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
              {message?.content?.deliveryDetails?.files?.map((file, index) => (
                <div key={index} className="w-full h-28 relative">
                  <AntdImage
                    width="100%"
                    height="100%"
                    src={`${imageBaseUrl}${file.path}`}
                    alt={`Delivery file ${index + 1}`}
                    className="absolute rounded-md border transform group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              ))}
            </div>
            {user && user?.role === "buyer" && (
              <div className="mt-10">
                {orderDetails?.status === "delivered" ? (
                  <button disabled className="px-5 py-2 bg-gray-300 rounded">
                    Accepted
                  </button>
                ) : (
                  <button
                    onClick={handleAcceptOrder}
                    className="px-5 py-2 text-white bg-green-500 rounded hover:bg-transparent border hover:border-green-500 hover:text-green-500 transition-all duration-300"
                  >
                    Accept Deliver
                  </button>
                )}
              </div>
            )}
          </div>
        );
      case "image":
        return (
          <div className="ml-14 mt-4">
            <p className="text-gray-800">{message?.content?.message}</p>
            <div className="mt-4 gap-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
              {message?.content?.files?.map((file, index) => (
                <div key={index} className="w-full h-28 relative">
                  <AntdImage
                    width="100%"
                    height="100%"
                    src={`${imageBaseUrl}${file.path}`}
                    alt={`Delivery file ${index + 1}`}
                    className="absolute rounded-md border transform group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="ml-14 mt-4">
            <p className="text-gray-800">{message?.content?.message}</p>
          </div>
        );
    }
  };

  const handleAcceptOrder = async () => {
    const res = await updateOrder({
      orderId: orderId,
      status: "delivered",
    });
    if (res.error) {
      toast.error(res.error.message);
    } else if (res.data) {
      toast.success("Order Received successfully");
    }
  };

  return (
    <div className="space-y-3">
      <div className="w-full px-5 py-8 bg-white border rounded-md flex items-center">
        <div className="ml-4">
          <h1 className="text-xl font-semibold text-gray-800">Order Started</h1>
          <p className="text-gray-600">
            <span className="font-semibold">
              {orderDetails?.clientId?.username}
            </span>
            sent all the information you need so you can start working on this
            order. You got this!
          </p>
        </div>
      </div>

      <div className="w-full bg-white border rounded-md">
        <div className="mb-5">
          {messages?.map((message) => (
            <div
              key={message._id}
              className={`p-5 text-left border-b bg-white rounded-t-md`}
            >
              <div className="flex items-center gap-3 pb-2">
                <Image
                  width={50}
                  height={50}
                  src={`${imageBaseUrl}${message.sender.image}`}
                  className="rounded-full"
                  alt="User Avatar"
                />
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-gray-600">
                    {message.sender.fullName}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatTimestampMessage(message?.createdAt)}
                  </span>
                </div>
              </div>
              {renderMessageContent(message)}
            </div>
          ))}
        </div>

        {orderDetails?.status === "delivered" && user?.role === "buyer" ? (
          <div className="p-5 bg-white  rounded-md">
            <h1 className="text-xl font-semibold text-gray-800">
              Review the Freelancer
            </h1>
            {/* Add review form here */}
            <textarea
              placeholder="Write your review..."
              rows={5}
              className="w-full px-4 py-5 mt-4 border rounded-lg focus:outline-none"
            />
            <button className="mt-4 px-8 py-2 bg-green-500 text-white rounded-lg">
              Submit Review
            </button>
          </div>
        ) : (
          <div className="p-4">
            <textarea
              placeholder="Type a message..."
              value={newMessage}
              rows={8}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full px-4 py-5 border rounded-lg focus:outline-none"
            />

            {/* Render attachment previews */}
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 p-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 border border-gray-300 rounded-lg"
                  >
                    {renderFilePreview(file)}
                    <button
                      type="button"
                      className="absolute -top-1 z-30 -right-1 bg-slate-200 text-red-500 rounded-full p-1"
                      onClick={() => handleRemoveAttachment(index)}
                    >
                      <FaXmark className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center mt-4">
              <div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="attachment-input"
                  multiple
                />
                <label
                  htmlFor="attachment-input"
                  className="px-4 py-2 text-gray-600 border rounded-md cursor-pointer"
                >
                  Attach Files
                </label>
              </div>
              <button
                onClick={handleSendMessage}
                className="px-8 py-2 bg-green-500 text-white rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activity;
