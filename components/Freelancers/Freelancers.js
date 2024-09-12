"use client";
import React, { useEffect, useState } from "react";
import Search from "../common/Search";
import FreelancersCard from "./FreelancersCard";
import { useGetAllUsersQuery } from "@/app/redux/features/getAllUsersApi";
import { useSearchParams } from "next/navigation";

const Freelancers = () => {
  const params = useSearchParams();
  const name = params.get('name');
  const [search, setSearch] = useState("");
  const { data, isSuccess, isFetching, isError, isLoading } =
    useGetAllUsersQuery(search);

  useEffect(()=>{
    setSearch(name) 
  },[name])
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
          title={"Most Expert Freelancers"}
          placeholder={"Search freelancers"}
          setSearch={setSearch}
          search={search}
        />
        {isLoading || isFetching ? (
          <div className="text-center py-5">Loading...</div>
        ) : isError ? (
          <div className="text-center py-5 text-red-500">
            An error occurred while fetching freelancers.
          </div>
        ) : data?.data?.attributes?.results?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-5 py-5">
            {data.data.attributes.results.map((freelancer) => (
              <FreelancersCard key={freelancer.id} data={freelancer} />
            ))}
          </div>
        ) : (
          <div className="text-center py-5 flex flex-col items-center">
            <img src="/not-data.svg" alt="No results" className="w-64 mb-4" />
            <p className="text-xl font-bold">No results found for &quot;{search}&quot;</p>
            <p className="text-sm text-gray-500">
              Try adjusting your search criteria to find what you&apos;re looking
              for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Freelancers;
