import React from "react";

const CategoriesCardSkeleton = () => {
  return (
    <div className="w-full h-[300px] md:h-[350px] p-2 cursor-pointer relative rounded-lg border border-gray-300 bg-gray-200">
      {/* Background Image Skeleton */}
      <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"></div>

      {/* Overlay Content Skeleton */}
      <div className="absolute bottom-0 left-0 right-0 px-5 py-2 rounded-b-lg animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default CategoriesCardSkeleton;
