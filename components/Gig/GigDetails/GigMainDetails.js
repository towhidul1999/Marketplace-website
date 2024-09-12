"use client";
import Image from "next/image";
import GigDescription from "./GigDescription";
import ComparePackages from "./ComparePackages";
import GigReviews from "./GigReviews";
import { useGetGigDetailsQuery } from "@/app/redux/features/getGigDetailsApi";
import { imageBaseUrl } from "@/lib/constant";
import { Carousel } from "antd";

const GigMainDetails = ({ slug, open, setOpen }) => {
  const { data } = useGetGigDetailsQuery(slug);
  const result = data?.data?.attributes?.results[0];

  return (
    <div className="md:w-2/3">
      <h1 className="text-xl md:text-3xl xl:text-4xl xxl:text-5xl font-medium pb-5">
        {result?.title}
      </h1>

      {/* gig images carousel */}
      <div className="rounded-xl">
        {result?.images?.length > 0 && (
          <Carousel autoplay className="rounded-xl">
            {result?.images?.map((image, index) => (
              <div key={index}>
                <Image
                  src={`${imageBaseUrl}${image}`}
                  width={1000}
                  height={1000}
                  className="w-full rounded-xl"
                  alt={`gig demo ${index + 1}`}
                />
              </div>
            ))}
          </Carousel>
        )}
      </div>

      {/* gig description */}
      <GigDescription content={result?.description} />

      {/* Compare packages */}
      <ComparePackages
        packages={result?.package}
        data={result}
        setOpen={setOpen}
        open={open}
      />

      {/* gig reviews */}
      <GigReviews id={result?._id} />
    </div>
  );
};

export default GigMainDetails;
