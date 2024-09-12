import React from "react";

const FreelancersCardSkeleton = () => {
  return (
    <div className="w-full h-[300px] md:h-[350px] p-2 cursor-pointer relative rounded-lg border border-gray-300 bg-gray-200">
      {/* Profile Image Skeleton */}
      <div className="rounded-full w-[50px] h-[50px] md:w-[100px] md:h-[100px] bg-gray-300 mx-auto mt-2 animate-pulse"></div>

      {/* Name and Intro Skeleton */}
      <div className="mt-4 text-center">
        <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-2 animate-pulse"></div>
        <div className="h-3 bg-gray-300 rounded w-3/4 mx-auto animate-pulse"></div>
      </div>

      {/* Location and Rating Skeleton */}
      <div className="mt-6 flex justify-between px-5 animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>

      {/* Skills Skeleton */}
      <div className="md:flex hidden flex-wrap gap-2 mt-4 px-5 animate-pulse">
        <div className="h-3 bg-gray-300 rounded w-1/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/6"></div>
      </div>

      {/* Projects and Hourly Rate Skeleton */}
      <div className="flex justify-between mt-4 px-5 animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default FreelancersCardSkeleton;
