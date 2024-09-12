"use client";
import { useGetFreelancerStatsQuery } from "@/app/redux/features/getFreelancerStats";
import useUser from "@/hooks/useUser";
import { imageBaseUrl } from "@/lib/constant";
import { Rate } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
const FreelancerMainCard = () => {
  const user = useUser();
  const router = useRouter();
  const {data:freelancerStats} = useGetFreelancerStatsQuery()
  return (
    <div
      style={{
        boxShadow: "0px 0px 24px 0px #0000001A",
      }}
      className="p-2 md:p-5 rounded-lg"
    >
      <Image
        src={`${imageBaseUrl}${user?.image}`}
        width={200}
        height={200}
        className="w-[100px] h-[100px] rounded-full"
        alt="Profile"
      />
      <div className="flex justify-between mt-[16px] items-center">
        <h1 className="text-[20px] font-bold">{user?.fullName}</h1>
        <button
          onClick={() => router.push("/profile/edit")}
          className="text-primary hover:text-white hover:bg-primary transition-all border-primary border-2 rounded-lg px-5 py-1"
        >
          Edit Profile
        </button>
      </div>
      <div>
        <p className="text-[15px] text-textGray mt-[16px]">{user?.intro}</p>
        <p className="text-[17px] text-textGray font-medium my-[16px]">
          {user?.location}
        </p>
        <p className="text-textGray">{user?.about}</p>
        <div className="flex justify-between mt-[16px]">
          <span className="flex gap-2">
            <Rate disabled allowHalf defaultValue={user?.review?.rating} />
            <span className="text-yellow-500">{user?.review?.rating}</span>
            <span className="font-medium">({user?.review?.total})</span>
          </span>
          <p className="font-bold">${user?.perHourRate}/hr</p>
        </div>
        <div>
          <p className="text-[17px] text-textGray font-medium my-[16px]">
            Skills
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.skills?.map((skill) => (
              <div
                key={skill?.id}
                className="bg-[#F5F5F5] px-2 py-1 text-[12px] cursor-pointer"
              >
                {skill?.text}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[17px] font-medium my-[16px]">Insights</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="flex justify-between items-center w-full">
              <p className="text-textGray font-medium">Projects worked on</p>
              <p className="text-textGray font-medium">{freelancerStats?.completedOrdersCount}</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-textGray font-medium">Buyers worked with</p>
              <p className="text-textGray font-medium">{freelancerStats?.uniqueBuyersCount}</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-textGray font-medium">Last active</p>
              <p className="text-textGray font-medium">{user?.online ? 'Active Now' : "0 min ago"}</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-textGray font-medium">Response time</p>
              <p className="text-textGray font-medium">{user?.responseTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerMainCard;
