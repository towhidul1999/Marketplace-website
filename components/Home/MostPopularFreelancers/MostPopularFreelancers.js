"use client";
import { useRouter } from "next/navigation";
import { MdArrowForward } from "react-icons/md";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { useGetAllUsersQuery } from "@/app/redux/features/getAllUsersApi";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import FreelancersCard from "./FreelancersCard";
import FreelancersCardSkeleton from "./FreelancersCardSkeleton";

const MostPopularFreelancers = () => {
  const router = useRouter();
  const { data, isLoading, isError, error } = useGetAllUsersQuery();
  const mostFreelancerData = data?.data?.attributes?.results;
  let content = null;
  if (isLoading) {
    <div className="w-full grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <SwiperSlide key={index}>
          <FreelancersCardSkeleton />
        </SwiperSlide>
      ))}
    </div>;
  } else if (!isLoading && isError && error) {
    content = (
      <h3 className="font-semibold text-rose-500 text-center py-5">
        Something went wrong
      </h3>
    );
  } else if (!isError && !isError && mostFreelancerData?.length === 0) {
    content = (
      <h3 className="font-semibold text-rose-500 text-center py-5">
        No freelancer found
      </h3>
    );
  } else if (!isError && !isError && mostFreelancerData?.length > 0) {
    content = (
      <Swiper
        breakpoints={{
          // when window width is >= 340px
          340: {
            slidesPerView: 2,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 3,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
          },
          // when window width is >= 1024px
          992: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
          1620: {
            slidesPerView: 6,
          },
        }}
        spaceBetween={20}
      >
        {mostFreelancerData?.map((data) => (
          <SwiperSlide key={data?.id}>
            <FreelancersCard data={data} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
  return (
    <div className="py-10 bg-secondary">
      <div>
        <div className="text-center">
          <h1 className="text-[20px] md:text-[35px] font-bold text-center">
            Most Popular Freelancers
          </h1>
          <p>Search and contact freelancers directly with no obligation</p>
        </div>
        <div className=" mt-10 ">{content}</div>

        <button
          onClick={() => router.push("/hire-freelancers")}
          className="flex gap-2 mt-10 justify-center items-center mx-auto cursor-pointer ring-1 ring-primary  text-primary py-1 px-5 rounded text-center hover:bg-primary hover:text-white transition duration-300"
        >
          <span>ALL FREELANCERS</span> <MdArrowForward />
        </button>
      </div>
    </div>
  );
};

export default MostPopularFreelancers;
