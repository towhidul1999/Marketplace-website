"use client";
import { useSearchParams } from "next/navigation";
import AllCard from "./AllCard";
import Filters from "./Filters";
import { Suspense, useEffect, useState } from "react";
import { useGetAllGigQuery } from "@/app/redux/features/getAllGigApi";
import Search from "../common/Search";
import { useGetAllCategoryQuery } from "@/app/redux/features/getAllCategoryApi";
import Loading from "../CustomCreate/Loading";
import { Pagination } from "antd";
import { toast } from "sonner";
import Image from "next/image";

const GigContent = () => {
  const [allGigsData, setAllGigsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const params = useSearchParams();
  const categories = params.get("categories")?.split(",") || [];
  const minPrice = params.get("minPrice");
  const title = params.get("title");
  const maxPrice = params.get("maxPrice");
  const [search, setSearch] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12); // Default limit is 12 per page
  const [totalItems, setTotalItems] = useState(0); // Total items count for pagination

  const { data: responseAllCategoriesData } = useGetAllCategoryQuery({});
  const categoriesData = responseAllCategoriesData?.results?.map(
    (category) => ({
      id: category.id,
      text: category.name,
    })
  );

  // Convert categories to corresponding category IDs
  const categoryIds = categoriesData
    ?.filter((category) => categories.includes(category.text))
    .map((category) => category.id);

  // Query to fetch all gigs with pagination
  const { data, isError, error } = useGetAllGigQuery({
    categories: categoryIds,
    minPrice,
    maxPrice,
    search,
    limit,
    page: currentPage,
  });

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message);
    }
    if (data?.data?.attributes?.results) {
      setAllGigsData(data?.data?.attributes?.results);
      setTotalItems(data?.data?.attributes?.totalResults); // Set the total number of gigs for pagination
      setIsLoading(false);
    }
  }, [data, error, isError]);

  useEffect(()=>{
    setSearch(title)
  },[title])
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsLoading(true);
  };

  if (!hydrated) {
    return null;
  }

  let content = null;
  if (isLoading) {
    content = <Loading />;
  } else if (isError && error) {
    content = (
      <h3 className="font-semibold text-rose-500 text-center py-5">
        Something went wrong
      </h3>
    );
  } else if (!allGigsData?.length) {
    content = (
      <div className="w-full h-full text-center py-5 flex flex-col items-center">
        <Image width={256} height={256} src="/not-data.svg" alt="No results" className=" mb-4" />
        <h2 className="text-xl font-bold mb-2">No Results Found</h2>
        <p className="text-lg text-gray-700 mb-2">
          {categories.length > 0 &&
            `No results found for categories: "${categories.join(", ")}".`}
          {search && ` No results found for "${search}".`}
          {!(categories.length > 0 || search) &&
            "Try adjusting your search criteria to find what you're looking for."}
        </p>
        <p className="text-sm text-gray-500">
          Please try different keywords or filters.
        </p>
      </div>
    );
  } else {
    content = (
      <div>
        <AllCard data={allGigsData} />
        <div className="flex justify-center mt-6">
          <Pagination
            current={currentPage}
            pageSize={limit} // Items per page
            total={totalItems} // Total number of gigs from the API response
            onChange={handlePageChange}
          />
        </div>
      </div>
    );
  }

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
      {/* filter and gig */}
      <div className="container flex flex-col md:flex-row py-10 gap-7">
        {/* filter */}
        <div className=" md:block md:w-1/3 xl:w-1/4">
          <Filters />
        </div>
        {/* gig */}
        <div className="md:w-2/3 xl:w-3/4 h-full">{content}</div>
      </div>
    </div>
  );
};

const Gig = () => {
  return (
    <Suspense fallback={<Loading />}>
      <GigContent />
    </Suspense>
  );
};

export default Gig;
