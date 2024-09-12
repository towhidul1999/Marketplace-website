"use client";
import { imageBaseUrl } from "@/lib/constant";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GiRoundStar } from "react-icons/gi";
const FreelancersCard = ({ data }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/freelancer-details?id=${data?.id}`)}
      className="w-full h-[300px] md:h-[350px] p-2 cursor-pointer relative rounded-lg border border-gray-300 bg-white"
    >
      <Image
        src={`${imageBaseUrl}${data?.image}`}
        width={500}
        height={50}
        alt="Categories Background"
        className="rounded-full w-[50px] h-[50px] md:w-[100px] md:h-[100px] flex justify-center mx-auto mt-2 items-center"
      />
      <div>
        <div>
          <h1 className="text-lg font-bold text-center">{data?.fullName}</h1>
          <p className="text-[14px] md:text-base h-[90px] text-center">
            {data?.intro}
          </p>
        </div>
        <div className="mt-10 md:mt-2">
          <div className="flex justify-between">
            <div className="font-bold">{data?.location}</div>
            <div className="flex gap-2">
              <GiRoundStar className="text-[#FFC403] w-6 h-6" />{" "}
              <span>
                {data?.review?.rating} ({data?.review?.total}){" "}
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
              "No Skills"
            )}
          </div>

          <div className="flex justify-between mt-2">
            <p className="text-sm">
              {data.totalProjectCompleted || 0} Projects
            </p>
            <p>
              $<span className="font-bold">{data.perHourRate || 0}</span>/hr
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancersCard;
