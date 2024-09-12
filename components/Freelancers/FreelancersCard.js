"use client";
import { imageBaseUrl } from "@/lib/constant";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GiRoundStar } from "react-icons/gi";

const FreelancersCard = ({ data }) => {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/freelancer-details?id=${data?.id}`)} className="md:[250px] p-2 xl:w-[300px] h-[300px] md:h-[350px] cursor-pointer relative rounded-lg border border-gray-300 bg-[#F9FFFC]">
      <Image
        src={imageBaseUrl+data?.image}
        width={500}
        height={50}
        alt="Categories Background"
        className="rounded-full w-[50px] h-[50px] md:w-[100px] md:h-[100px] flex justify-center mx-auto mt-2 items-center"
      />
      <div>
        <div>
          <h1 className="text-lg font-bold text-center">{data?.fullName}</h1>
          <p className="text-[14px] md:text-base h-[90px] text-center">{data?.intro || "No Intro Provided"}</p>
        </div>
        <div className="mt-10 md:mt-2">
          <div className="flex justify-between">
            <div className="font-bold">{data?.location || "No Location Provided"}</div>
            <div className="flex items-center gap-2">
              <GiRoundStar className="text-[#FFC403] w-4 h-4" />{" "}
              <span>
                {data.rating} ({data.totalRating | 0}){" "}
              </span>
            </div>
          </div>
          <div className="md:flex flex-wrap hidden gap-2 mt-2">
            {data?.skills?.length ? (
              data?.skills.length > 3 ? (
                <>
                  {data?.skills?.slice(0, 3).map((data, index) => (
                    <div key={index} className="bg-[#F5F5F5] px-2 text-[12px] ">
                      {data?.text}
                    </div>
                  ))}
                  <div className="bg-[#F5F5F5] border-gray-300 border-[1px] px-2 text-[12px] rounded-md">
                    ......
                  </div>
                </>
              ) : (
                data?.skills?.map((data, index) => (
                  <div key={index} className="bg-[#F5F5F5] px-2 text-[12px] ">
                    {data?.text}
                  </div>
                ))
              )
            ) : (
              <p className="text-red-500">No Skills</p>
             
            )}
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-sm">{data.totalProjectCompleted | 0} Projects</p>
            <p>
              $ <span className="font-bold">{data.hourlyRate | 0}</span>/hr
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancersCard;
