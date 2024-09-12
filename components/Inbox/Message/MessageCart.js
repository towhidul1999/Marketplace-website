"use client";
import { useGetChatQuery } from "@/app/redux/features/inbox/inboxApi";
import { imageBaseUrl } from "@/lib/constant";
import formatTimestampMessage from "@/utils/formatTimestamp";
import { Image } from "antd";
import { IoCheckmarkDone } from "react-icons/io5";
import { BsArrowRepeat } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import Link from "next/link";
import useUser from "@/hooks/useUser";
import moment from "moment";
import { useCreateBuyerOrderMutation } from "@/app/redux/features/order/buyerOrderApi";

const MessageCart = ({ message }) => {
  const user = useUser();
  const { id: messageId, content, chat, sender, createdAt } = message || {};
  const { data: receiver } = useGetChatQuery(chat);
  const me = user?.id === sender?.id;
  const [createOrder] = useCreateBuyerOrderMutation();

  const renderMessageContent = () => {
    if (content.messageType === "text") {
      return (
        <p
          className={`max-w-[500px] ${
            me ? "bg-primary text-white" : "bg-white"
          } border-[1px] border-secondary p-3 rounded-[18px] text-sm ${
            me ? "rounded-br-none" : "rounded-bl-none"
          }`}
          style={{ minWidth: "50px" }}
        >
          {content?.message}
        </p>
      );
    } else if (content.messageType === "image") {
      const isSingleImage = content?.files.length === 1;
      const isDoubleImage = content?.files.length === 2;
      return (
        <div className="space-y-2">
          <div
            className={`max-w-[500px] flex ${
              me ? "justify-end" : "justify-start"
            }`}
          >
            {content.message && (
              <p
                className={`w-fit ${
                  me ? "bg-primary text-white" : "bg-white"
                } border-[1px] border-secondary p-3 rounded-[18px] text-sm ${
                  me ? "rounded-br-none" : "rounded-bl-none"
                }`}
              >
                {content?.message}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <Image.PreviewGroup>
              <div
                className={`${
                  isSingleImage
                    ? "w-full"
                    : isDoubleImage
                    ? "grid grid-cols-2 gap-2"
                    : "grid grid-cols-2 sm:grid-cols-3 gap-2"
                }`}
              >
                {content?.files.map((file, index) => (
                  <Image
                    key={index}
                    width={isSingleImage ? 400 : isDoubleImage ? 200 : 120}
                    height={isSingleImage ? 250 : isDoubleImage ? 200 : 120}
                    className="rounded-lg"
                    src={`${imageBaseUrl}${file?.path}`}
                    alt={`image-${index}`}
                  />
                ))}
              </div>
            </Image.PreviewGroup>
          </div>
        </div>
      );
    } else if (content.messageType === "offer") {
      const { offerDetails } = content;
      return (
        <div
          className={`max-w-[500px] ${
            me ? "bg-primary text-white" : "bg-white"
          } border-[1px] border-secondary py-2 rounded-[18px] text-sm ${
            me ? "rounded-br-none" : "rounded-bl-none"
          }`}
        >
          <h1 className="text-xl font-medium border-b px-4 py-3">
            <Link href={`/gig/${offerDetails?.slug}`}>
              {offerDetails?.gigTitle}
            </Link>
            <span className="font-bold ml-5">${offerDetails?.price}</span>
          </h1>
          <div className="p-4 border-b">
            <p className="text-[16px]">{offerDetails?.description}</p>
          </div>
          <div className="p-4 border-b">
            <h1 className="text-xl font-medium">Your Offer Includes</h1>
            <div className="flex gap-5 py-2">
              <h1 className="flex gap-2 items-center ">
                <BsArrowRepeat className="size-5 font-semibold " />
                <span className="font-semibold">
                  {offerDetails?.revisionDays} Revisions
                </span>
              </h1>
              <h1 className="flex gap-2 items-center">
                <IoMdTime className="size-5 font-semibold" />
                <span className="font-semibold">
                  {offerDetails?.deliveryTime} Days Delivery
                </span>
              </h1>
            </div>
          </div>
          <div className="flex justify-end p-4">
            {user?.role === "freelancer" ? (
              offerDetails?.status === "accepted" ? (
                <div className="flex gap-5">
                  <Link href={`/order/${offerDetails?.orderId}`}>
                    <button
                      className={`px-5 py-2 rounded ${
                        me ? "border" : "bg-green-500 text-white"
                      }`}
                    >
                      View Order
                    </button>
                  </Link>
                  <button
                    disabled
                    className={`px-5 py-2 rounded shadow ${
                      me ? "bg-white text-green-500  " : "bg-gray-100"
                    }`}
                  >
                    Offer Accepted
                  </button>
                </div>
              ) : (
                <button className="px-5 py-2 rounded shadow bg-white text-green-500">
                  Withdraw Offer
                </button>
              )
            ) : offerDetails?.status === "accepted" ? (
              <div className="flex gap-5">
              <Link href={`/order/${offerDetails?.orderId}`}>
                <button
                  className={`px-5 py-2 rounded ${
                    me ? "border" : "bg-green-500 text-white"
                  }`}
                >
                  View Order
                </button>
              </Link>
              <button
                disabled
                className={`px-5 py-2 rounded shadow ${
                  me ? "bg-white text-green-500  " : "bg-gray-100"
                }`}
              >
                Offer Accepted
              </button>
            </div>
            ) : (
              <div className="flex gap-5">
                <button
                  className={`px-5 py-2 rounded ${
                    me ? "border" : "bg-green-500 text-white"
                  }`}
                >
                  Cancel Offer
                </button>
                <button
                  onClick={handleOfferOrder}
                  className={`px-5 py-2 rounded shadow ${
                    me ? "bg-white text-green-500  " : "bg-gray-100"
                  }`}
                >
                  Accept Offer
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };
  const handleOfferOrder = async () => {
    const { gigTitle, gigId, freelancerId, clientId, deliveryTime, price } =
      content?.offerDetails || {};
    const orderData = {
      items: [
        {
          name: gigTitle,
          price: price,
          quantity: 1,
        },
      ],
      messageId,
      gigId,
      freelancerId,
      clientId,
      deliveryDate: moment(new Date())
        .add(deliveryTime, "days")
        .format("YYYY-MM-DD"),
    };
    const res = await createOrder(orderData);
    if (res.error) {
      console.log(res.error);
      return;
    }
    if (res.data) {
      window.location = res?.data?.url;
    }
  };

  return (
    <>
      <div
        className={`flex items-end gap-3 my-5 ${
          me ? "flex-row-reverse mr-5" : "ml-5"
        }`}
      >
        <Image
          width={35}
          height={35}
          className="w-[35px] h-[35px] rounded-full"
          src={`${imageBaseUrl}${
            me ? user?.image : receiver?.participants[0]?.image
          }`}
          alt=""
        />
        <div className="flex flex-col">
          {renderMessageContent()}
          <p
            className={`flex ${
              me ? "justify-end" : "justify-start"
            } py-2 items-center text-xs gap-1 text-gray-500`}
          >
            {me && <IoCheckmarkDone className="size-3.5 text-emerald-500" />}
            <span>{formatTimestampMessage(createdAt)}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default MessageCart;
