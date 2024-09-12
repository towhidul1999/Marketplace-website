"use client";
import { useGetFreelancerSpecificQuery } from "@/app/redux/features/getFreelancerSpecificApi";
import { imageBaseUrl } from "@/lib/constant";
import { Image, Rate } from "antd";
import Link from "next/link";
import { IoStar } from "react-icons/io5";
import ReviewsCard from "../Profile/Reviews/ReviewsCard";
import { useGetFreelancerStatsQuery } from "@/app/redux/features/getFreelancerStats";

const FreelancerDetails = ({ searchParams }) => {
  const id = searchParams?.id;
  const { data } = useGetFreelancerSpecificQuery(id, {
    skip: !id,
  });
  const {data:freelancerStats} = useGetFreelancerStatsQuery()
  const user = data?.data?.attributes?.user;

  return (
    <div>
      <div className="container flex flex-col md:flex-row py-10 md:gap-7">
        <div className="md:w-1/3">
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
              className="w-[100px] h-[100px] rounded-full  items-center"
              alt="Profile"
            />
            <div className="flex justify-between mt-[16px] items-center">
              <h1 className="text-[20px] font-bold">{user?.fullName}</h1>
            </div>
            <div>
              <p className="text-[15px] text-textGray mt-[16px]">
                {user?.intro}
              </p>
              <p className="text-[17px] text-textGray font-medium  my-[16px]">
                {user?.location}
              </p>
              <p className="text-textGray">{user?.about}</p>
              <div className="flex justify-between mt-[16px]">
                <span className="flex gap-2">
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={user?.review?.rating}
                  />
                  <span className="text-yellow-500">
                    {user?.review?.rating}
                  </span>
                  <span className="font-medium">({user?.review?.total})</span>
                </span>
                <p className="font-bold">$0/hr</p>
              </div>
              {/* skill */}
              <div>
                <p className="text-[17px] text-textGray font-medium  my-[16px]">
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
              {/* Insights */}
              <div>
                <p className="text-[17px] font-medium my-[16px]">Insights</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="flex justify-between items-center w-full">
                    <p className="text-textGray font-medium">
                      Projects worked on
                    </p>
                    <p className="text-textGray font-medium">0</p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-textGray font-medium">
                      Buyers worked with
                    </p>
                    <p className="text-textGray font-medium">0</p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-textGray font-medium">Last active</p>
                    <p className="text-textGray font-medium">0</p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-textGray font-medium">Response time</p>
                    <p className="text-textGray font-medium">instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-2/3">
          <h1 className="text-3xl font-medium mb-5">All SERVICE NAMES</h1>
          <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-5">
            {user?.gigs.length > 0 ? (
              user?.gigs?.map((item, index) => (
                <div key={index} className="w-full">
                  <Link href={`/gig/${item?.slug}`}>
                    <div
                      style={{ boxShadow: "0px 0px 24px 0px #0000001A" }}
                      // key={item.id}
                      className="flex gap-2 flex-col rounded-lg"
                    >
                      <div className="w-full">
                        <img
                          src={`${imageBaseUrl}${item?.images[0]}`}
                          alt="gig"
                          className="w-full h-[180px] rounded-t-lg"
                        />
                      </div>
                      <div className="p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Image
                              src={`${imageBaseUrl}${user?.image}`}
                              width={50}
                              height={50}
                              alt="gig"
                              className="w-[50px] h-[50px] rounded-full"
                            />
                            <div>
                              <p className="text-[14px] font-bold">
                                {user?.fullName}
                              </p>
                              <div className="flex gap-1">
                                <IoStar className="text-primary" />
                                <p className="text-[12px] text-primary">
                                  {user?.review?.rating}
                                </p>
                                <p className="text-[12px]">
                                  ({user?.review?.total || 0})
                                </p>
                              </div>
                            </div>
                          </div>
                          <p className="text-[14px] font-bold">
                            ${item?.price}
                          </p>
                        </div>

                        <p className="h-[50px]">{item?.title}</p>

                        <div className="flex flex-wrap gap-2 mt-8">
                          {user?.skills?.map((skill) => (
                            <div
                              key={skill.id}
                              className="bg-[#F5F5F5] px-2 py-1 text-[12px] cursor-pointer"
                            >
                              {skill?.text}
                            </div>
                          ))}
                        </div>

                        <div>
                          <p className="text-[14px] text-textGray pt-5">
                            Delivered in 5 days
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-textGray">No Gig Found</p>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-medium my-5"> All PORTFOLIO</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-center">
              {user?.portfolios.length > 0 ? (
                user?.portfolios?.map((item, index) => (
                  <div key={index} className="w-full h-[200px]">
                    <Image
                      width="100%"
                      height="100%"
                      src={`${imageBaseUrl}${item?.image}`}
                      className=" rounded-lg my-2"
                      alt="Portfolio Image"
                    />
                  </div>
                ))
              ) : (
                <p className="text-textGray">No Portfolio Found</p>
              )}
            </div>

            <div className="">
              <h1 className="text-3xl font-medium my-5">REVIEW</h1>
              {user?.reviews?.length > 0 ? (
                user?.reviews?.map((item, index) => (
                  <ReviewsCard key={item._id} item={item} />
                ))
              ) : (
                <p className="text-textGray">No Review Found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDetails;
