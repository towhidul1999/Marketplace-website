"use client";
import { useRouter } from "next/navigation";
import { useGetMyListQuery } from "@/app/redux/features/getMyListApi";
import Loading from "../CustomCreate/Loading";
import MyListCard from "./MyListCard";

const MyList = () => {
  const router = useRouter(); // Initialize useRouter
  const { data, isLoading, isError } = useGetMyListQuery();
  const myListData = data?.data?.attributes?.results;

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    content = (
      <h3 className="font-semibold text-rose-500 text-center py-5">
        Something went wrong
      </h3>
    );
  } else if (myListData?.length === 0) {
    content = (
      <div className="w-full h-screen text-center py-5 flex flex-col justify-center items-center">
        <img src="/not-data.svg" alt="No items" className="w-64 mb-4" />
        <h2 className="text-xl font-bold mb-2">Your Wishlist is Empty</h2>
        <p className="text-lg text-gray-700 mb-2">
          It looks like you haven’t added any items to your wishlist yet.
        </p>
        <p className="text-sm text-gray-500">
          Browse our catalog and add items to your wishlist to keep track of
          your favorites.
        </p>
        <div className="flex items-center my-4">
          <button
            onClick={() => router.push("/gig")} 
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md"
          >
            Back to Gig List
          </button>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 py-5">
        {myListData?.map((item) => (
          <MyListCard key={item._id} item={item} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full container py-5">
      <h2 className="text-2xl font-semibold">My Wishlist</h2>
      {content}
    </div>
  );
};

export default MyList;
