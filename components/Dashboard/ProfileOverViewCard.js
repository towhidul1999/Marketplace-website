"use client";
import Image from "next/image";
import { Rate } from "antd";
import useUser from "@/hooks/useUser";
import { imageBaseUrl } from "@/lib/constant";

const ProfileOverviewCard = () => {
  const user = useUser()
  return (
    <div
      style={{
        boxShadow: "0px 0px 24px 0px #0000001A",
      }}
      className="p-4 md:p-6 rounded-lg bg-white"
    >
      <div className="flex justify-center">
        <Image
         src={`${imageBaseUrl}${user?.image}`}
          width={200}
          height={200}
          className="w-36 h-36 rounded-full"
          alt="Profile"
        />
      </div>

      <div>
        <div className="flex justify-between mt-4 items-center">
          <div className="flex items-center gap-2">
            <Rate disabled allowHalf defaultValue={user?.review?.rating} />
            <span className="text-yellow-500">{user?.review?.rating}</span>
            <span className="text-gray-600 font-medium">({user?.review?.total})</span>
          </div>
          <p className="font-bold text-xl">${user?.perHourRate}/hr</p>
        </div>

        {/* Insights */}
        <div>
          <p className="text-xl font-medium mt-6 mb-4">Insights</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-gray-600 font-medium">Projects worked on</p>
              <p className="text-gray-600 font-medium">45</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600 font-medium">Buyers worked with</p>
              <p className="text-gray-600 font-medium">20</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600 font-medium">Last active</p>
              <p className="text-gray-600 font-medium">Apr 04 2024</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600 font-medium">Response time</p>
              <p className="text-gray-600 font-medium">instantly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverviewCard;
