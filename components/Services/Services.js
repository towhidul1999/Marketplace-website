"use client";
import React, { useState } from "react";
import ServiceCard from "./ServiceCard";
import AllCardTopFilters from "./AllCardTopFilters";
import Search from "../common/Search";
import Loading from "../CustomCreate/Loading";
import { useGetAllCategoryQuery } from "@/app/redux/features/getAllCategoryApi";
const Services = () => {
  const [sortBy, setSortBy] = useState("online");
  const [search, setSearch] = useState("");
  const {
    data: responseAllCategoriesData,
    isFetching,
    isError,
    isLoading,
  } = useGetAllCategoryQuery({ search, sortBy });
  const categoriesData = responseAllCategoriesData?.results;

  const filterData = categoriesData?.filter((item) => item.type === sortBy);
  return (
    <div>
      <div
        className="relative bg-cover bg-center h-[170px] md:h-[300px]"
        style={{ backgroundImage: "url('/orthers/cover-gig.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-start items-center text-white p-4">
          <div className="w-full max-w-4xl my-auto text-center">
            <h1 className="text-xl md:text-3xl font-bold">
              Get High Quality Web Design Services & Offers
            </h1>
            <p className="text-sm md:text-base">
              Looking for Web Design offers and services? People Per Hour has
              you covered.
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <Search
          title={"Most popular categories"}
          placeholder={"Search Services"}
          setSearch={setSearch}
          search={search}
        />
        <AllCardTopFilters sortBy={sortBy} setSortBy={setSortBy} />
        {isLoading || isFetching ? (
          <Loading />
        ) : isError ? (
          <div className="text-center py-5 text-red-500">
            An error occurred while fetching services.
          </div>
        ) : categoriesData?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-5 py-5">
            {categoriesData?.map((category) => (
              <ServiceCard key={category.id} data={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-5 flex flex-col items-center">
            <img src="/not-data.svg" alt="No results" className="w-64 mb-4" />
            <p className="text-xl font-bold">
              No results found for &quot;{search}&quot;
            </p>
            <p className="text-sm text-gray-500">
              Try adjusting your search criteria to find what you&apos;re
              looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
