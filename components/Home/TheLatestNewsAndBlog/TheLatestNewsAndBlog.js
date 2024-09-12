import { useGetAllBlogsQuery } from "@/app/redux/features/getAllBlogs";
import Loading from "@/components/CustomCreate/Loading";
import BlogCard from "../../Blogs/BlogCard";
import BlogCardSkeleton from "@/components/Blogs/BlogCardSkeleton";

const TheLatestNewsAndBlog = () => {
  const { data, isLoading, isError, error } = useGetAllBlogsQuery();
  const blogData = data?.data?.attributes?.results;
  let content = null;
  if (isLoading) {
    content = (
      <div className="mt-[30px] items-center mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
    );
  } else if (!isLoading && isError && error) {
    content = (
      <h3 className="font-semibold text-rose-500 text-center py-5">
        Something went wrong
      </h3>
    );
  } else if (!isError && !isError && blogData?.length === 0) {
    content = (
      <h3 className="font-semibold text-rose-500 text-center py-5">
        No blog found
      </h3>
    );
  } else if (!isError && !isError && blogData?.length > 0) {
    content = (
      <div className="mt-[30px] items-center mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {blogData?.slice(0, 4).map((item) => (
          <BlogCard key={item?.id} item={item} />
        ))}
      </div>
    );
  }
  return (
    <div className="bg-primaryBg">
      <div className="container py-[60px] md:py-[100px]">
        <div className="flex flex-col items-center text-center w-full mb-12">
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">BLOG</p>
          <h1 className="sm:text-3xl text-2xl font-semibold title-font mb-4 text-gray-900">
            Our Blog
          </h1>
        </div>
        {content}
      </div>
    </div>
  );
};

export default TheLatestNewsAndBlog;
