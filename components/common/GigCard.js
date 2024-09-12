import { imageBaseUrl } from "@/lib/constant";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoStar } from "react-icons/io5";

function GigCard({ item }) {
  return (
    <Link href={`/gig/${item?.slug}`}>
      <div
        style={{ boxShadow: "0px 0px 24px 0px #0000001A" }}
        className="flex gap-2 flex-col rounded-lg"
      >
        <div className="w-full h-[180px] relative">
          {
            item?.images[0] && <Image
            src={`${imageBaseUrl}${item?.images[0]}`}
            alt="gig"
            className="w-full absolute rounded-t-lg"
            fill
          />
          }
          
        </div>
        <div className="p-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Image
                  width={40}
                  height={40}
                  src={item?.userId?.image && `${imageBaseUrl}${item?.userId?.image}`}
                  alt="freelancerImage"
                  className="rounded-full"
                />
                {
                  item?.userId?.online && <div className={`absolute right-1 ring-1 ring-white bottom-0 size-[8px] rounded-full bg-green-500`} />
                }

              </div>
              <div>
                <p className="text-[14px] font-bold">
                  {item?.userId?.fullName}
                </p>
                <div className="flex gap-1">
                  <IoStar className="text-primary" />
                  <p className="text-[12px] text-primary">
                    {item?.userId?.review?.rating}
                  </p>
                  <p className="text-[12px]">
                    ({item?.userId?.review?.total || 0})
                  </p>
                </div>
              </div>
            </div>
            <p className="text-[14px] font-bold">${item?.price}</p>
          </div>
          <p>{item?.title?.slice(0,85)}</p>
          <div className="flex flex-wrap gap-2 mt-5">
            {item?.userId?.skills?.slice(0,6)?.map((skill) => (
              <div
                key={skill.id}
                className="bg-[#F5F5F5] text-sm px-2 py-1 cursor-pointer"
              >
                {skill?.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GigCard;
