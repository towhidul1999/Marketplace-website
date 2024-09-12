"use client";
import { useState, useEffect, useCallback } from "react";
import { useGetBuyerOrderDetailsQuery } from "@/app/redux/features/order/buyerOrderApi";
import { imageBaseUrl } from "@/lib/constant";
import Image from "next/image";
import moment from "moment";
import DeliverNowModal from "./DeliveryModal";
import ExtendDeliveryDateModal from "./ExtendDeliveryDateModal";
import { MdOutlineError } from "react-icons/md";
import { useSendOrderMessageMutation } from "@/app/redux/features/orderMessage/orderMessage.api";
import useUser from "@/hooks/useUser";
import { toast } from "sonner";

const OrderRightSide = ({ orderId }) => {
  const user = useUser();
  const { data: orderDetails } = useGetBuyerOrderDetailsQuery(orderId, {
    skip: !orderId,
  });
  const [sendOrderMessage] = useSendOrderMessageMutation();
  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const deliveryDate = moment(orderDetails?.deliveryDate);
    const difference = deliveryDate.diff(now);

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, [orderDetails?.deliveryDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isLate, setIsLate] = useState(false);
  const [isDeliverNowModalOpen, setIsDeliverNowModalOpen] = useState(false);
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);

      if (Object.keys(updatedTimeLeft).length === 0) {
        setIsLate(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const handleOpenDeliverNowModal = () => {
    setIsDeliverNowModalOpen(true);
  };

  const handleCloseDeliverNowModal = () => {
    setIsDeliverNowModalOpen(false);
  };

  const handleOpenExtendModal = () => {
    setIsExtendModalOpen(true);
  };

  const handleCloseExtendModal = () => {
    setIsExtendModalOpen(false);
  };

  const handleDeliverNow = async (value) => {
    const { deliveryMessage, files } = value;
    const formData = new FormData();
    formData.append("orderId", orderId);
    formData.append("deliveryMessage", deliveryMessage);
    formData.append("receiver", orderDetails?.clientId?.id);
    files.forEach((file) => {
      formData.append("files", file);
    });
    const res = await sendOrderMessage(formData);
    if (res.error) {
      toast.error(res.error.message)
    }
    if (res.data) {
      handleCloseDeliverNowModal();
    }
  };

  const handleExtendDeliveryDate = async (value) => {
    handleCloseExtendModal();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-cyan-900";
      case "completed":
        return "bg-green-500";
      case "late":
        return "bg-rose-500";
      case "delivered":
        return "bg-pink-500";
      case "cancelled":
        return "bg-gray-500";
      default:
        return "black";
    }
  };

  const formattedDeliveryDate = orderDetails?.deliveryDate
    ? moment(orderDetails.deliveryDate).format("D MMMM YYYY")
    : "N/A";

  return (
    <div className="w-full col-span-3 bg-white space-y-8">
      {user && user?.role === "freelancer" && (
        <div className="border rounded-lg shadow px-5 py-8">
          {orderDetails?.status === "delivered" ? (
            <div className="flex flex-col items-center justify-center mt-5 text-center">
              <h2 className="text-xl font-bold mb-4">Order Delivered</h2>
              <p className="text-gray-600 mb-2">
                The order has been delivered. Please review the delivery.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold flex justify-center items-center gap-2">
                <span>Time left to deliver</span>
                <span>
                  {isLate && (
                    <MdOutlineError className="text-rose-500 size-5" />
                  )}
                </span>
              </h2>
              {/* Rest of the time left UI */}
              <div>
                <button
                  disabled={isLate}
                  className={`w-full px-5 py-2 ${
                    isLate
                      ? "bg-gray-300 text-gray-700"
                      : "bg-[#00BF63] text-white"
                  }  rounded my-4 `}
                  onClick={handleOpenDeliverNowModal}
                >
                  Deliver Now
                </button>
                <button
                  onClick={handleOpenExtendModal}
                  className="w-full text-center font-semibold text-gray-600"
                >
                  Extend Delivery Date
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <div className="border rounded-lg shadow p-5">
        <h2 className="text-xl font-bold mb-5">Order Details</h2>
        <div className="flex flex-col space-y-4">
          <div className="space-y-2">
            <div className="w-full h-40 relative">
              <Image
                fill
                src={
                  orderDetails?.gigId?.images[0]
                    ? `${imageBaseUrl}${orderDetails?.gigId?.images[0]}`
                    : ""
                }
                alt="Gig"
                className="absolute object-cover rounded"
              />
            </div>
            <h3 className="text-start font-semibold">
              {orderDetails?.gigId?.title}
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Ordered by</h1>
              <span className="italic font-semibold ml-2">
                {orderDetails?.clientId?.username}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Order Status</h1>
              <span
                className={`ml-2 px-4 py-0.5 text-sm rounded text-white ${getStatusColor(
                  orderDetails?.status
                )}`}
              >
                {orderDetails?.status}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Delivery Date</h1>
              <span className="ml-2 font-semibold">
                {formattedDeliveryDate}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <h1 className="font-semibold"> Total Price</h1>
              <span className="font-semibold ml-2 ">
                ${orderDetails?.items[0]?.price}
              </span>
            </div>
          </div>
        </div>
      </div>
      <DeliverNowModal
        isOpen={isDeliverNowModalOpen}
        onClose={handleCloseDeliverNowModal}
        onSubmit={handleDeliverNow}
      />
      <ExtendDeliveryDateModal
        isOpen={isExtendModalOpen}
        onClose={handleCloseExtendModal}
        onSubmit={handleExtendDeliveryDate}
        originalDeliveryDate={formattedDeliveryDate}
      />
    </div>
  );
};

export default OrderRightSide;
