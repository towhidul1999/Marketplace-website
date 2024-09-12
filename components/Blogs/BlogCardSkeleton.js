const BlogCardSkeleton = () => {
  return (
    <div className="rounded-lg bg-gray-200 overflow-hidden max-w-[380px] p-[16px] shadow-lg animate-pulse">
      {/* Image Skeleton */}
      <div className="relative overflow-hidden">
        <div className="w-full h-[250px] bg-gray-300 rounded-lg"></div>
      </div>

      <div className="px-[5px] mt-[16px]">
        {/* Date Skeleton */}
        <div className="flex text-[#6B6B6B] gap-5 border-b-2 pb-3">
          <div className="flex items-center gap-2 w-full">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>

        {/* Title Skeleton */}
        <div className="mt-3 h-6 bg-gray-300 rounded w-3/4"></div>

        {/* Button Skeleton */}
        <div className="mt-[20px] h-10 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
