"use client";
import { MdArrowForward } from "react-icons/md";
import CategoriesCard from "./CategoriesCard";
import CategoriesCardSkeleton from "./CategoriesCardSkeleton"; // Import the skeleton component
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";
import { useGetAllCategoryQuery } from "@/app/redux/features/getAllCategoryApi";
import Loading from "@/components/CustomCreate/Loading";

const MostPopularCategories = () => {
  const router = useRouter();
  const {
    data: responseCategoriesData,
    isLoading,
    isError,
    error,
  } = useGetAllCategoryQuery({});
  const categoriesData = responseCategoriesData?.results;

  let content = null;

  if (isLoading) {
    content = (
      <div className="w-full grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <SwiperSlide key={index}>
            <CategoriesCardSkeleton />
          </SwiperSlide>
        ))}
      </div>
    );
  } else if (isError && error) {
    content = (
      <h3 className="font-semibold text-rose-500 text-center py-5">
        Something went wrong
      </h3>
    );
  } else if (!isError && categoriesData?.length === 0) {
    content = (
      <h3 className="font-semibold text-rose-500 text-center py-5">
        No categories found
      </h3>
    );
  } else if (!isError && categoriesData?.length > 0) {
    content = (
      <Swiper
        breakpoints={{
          340: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
          1620: { slidesPerView: 6 },
        }}
        spaceBetween={20}
      >
        {categoriesData.map((data) => (
          <SwiperSlide key={data.id}>
            <CategoriesCard data={data} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <div className="py-10">
      <div>
        <h1 className="text-[20px] md:text-[35px] font-bold text-center">
          Most Popular Categories
        </h1>
        <div className="mt-10">{content}</div>
        <button
          onClick={() => router.push("/services")}
          className="flex gap-2 mt-10 justify-center items-center mx-auto cursor-pointer ring-1 ring-primary text-primary py-1 px-5 rounded text-center hover:bg-primary hover:text-white transition duration-300"
        >
          <span> ALL CATEGORIES</span> <MdArrowForward />
        </button>
      </div>
    </div>
  );
};

export default MostPopularCategories;
