import { setIsOpen } from "@/app/redux/features/inbox/userToChatSlice";
import useUser from "@/hooks/useUser";
import { imageBaseUrl } from "@/lib/constant";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
const ChatCart = ({ chatData }) => {
  const user = useUser();
  const { chat, lastMessage } = chatData || {};
  const { fullName, image, online } = chat.participants[0] || {};
  const { content, sender, createdAt } = lastMessage || {};
  const myLastMessage = sender === user?.id;
  const dispatch = useDispatch();

  const formatTime = (time) => {
    const now = moment();
    const duration = moment.duration(now.diff(time));
    const hours = duration.asHours();
    const days = duration.asDays();

    if (duration.asMinutes() < 1) {
      return "Just now";
    } else if (duration.asMinutes() < 60) {
      return `${Math.floor(duration.asMinutes())}m`;
    } else if (hours < 24) {
      return `${Math.floor(hours)}h`;
    } else if (days < 2) {
      return "Yesterday";
    } else if (days < 7) {
      return `${Math.floor(days)}d`;
    } else {
      return moment(time).format("MMM D");
    }
  };

  return (
    <Link href={`/inbox/${chat?.id}`}>
      <div
        onClick={() => dispatch(setIsOpen())}
        className="w-full p-2.5 flex  gap-3 cursor-pointer bg-[#f5f5f5] my-2 rounded-xl"
      >
        <div>
          <div className="relative">
            <Image
              width={100}
              height={100}
              className="size-14 rounded-full"
              src={image ? `${imageBaseUrl}${image}` : ""}
              alt="image"
            />
            {online && (
              <div
                className={`absolute right-2 bottom-0.5 ring-1 ring-white size-[8px] rounded-full bg-green-500`}
              />
            )}
          </div>
        </div>
        <div className="w-[80%] flex justify-between gap-2">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold">{fullName}</h1>
            <p className="text-sm">
              {content?.message && content?.messageType === "text" ? (
                <div className="flex gap-2">
                  <div>
                    {myLastMessage && "You:"}
                    {content?.message?.length > 20
                      ? `${content?.message?.slice(0, 20)}...`
                      : content?.message}
                  </div>
                </div>
              ) : content?.files?.length > 0 &&
                content?.messageType === "image" ? (
                <h1>
                  {myLastMessage
                    ? `You sent ${
                        content?.files?.length === 1
                          ? "a photo"
                          : `${content?.files?.length} photos`
                      } `
                    : `sent ${
                        content?.files?.length === 1
                          ? "a photo"
                          : `${content?.files?.length} photos`
                      } `}
                </h1>
              ) : (
                <div className="flex gap-2">
                  <div>
                    {myLastMessage
                      ? "You unsent a message"
                      : `unsent a message`}
                  </div>
                </div>
              )}
            </p>
          </div>
          <p className="text-sm">{formatTime(createdAt)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ChatCart;
