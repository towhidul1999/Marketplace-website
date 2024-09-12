"use client";
import GigReviewCard from "./GigReviewCard";
import { useGetAllReviewApiQuery } from "@/app/redux/features/getAllReviewApi";
const GigReviews = ({ id }) => {
  const { data } = useGetAllReviewApiQuery({ userId: null, gigId: id });
  return (
    <>
      {data?.data?.attributes?.results.length > 0 ? (
        <div className="p-2 md:p-5 rounded-lg">
          {/* tab */}
          <div className="flex justify-between items-center text-center">
            <div className="flex flex-row items-center text-center  mt-[16px]">
              <h1 className="text-3xl font-semibold">Review</h1>
            </div>
          </div>
          <div
            style={{
              boxShadow: "0px 0px 24px 0px #0000001A",
            }}
            className=" flex flex-col gap-5 rounded-lg my-5 py-5 p-[10px]"
          >
            {/* review */}
            {data?.data?.attributes?.results.map((item) => (
              <GigReviewCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-[20px] text-red-500">No Review Found</p>
      )}
    </>
  );
};

export default GigReviews;
