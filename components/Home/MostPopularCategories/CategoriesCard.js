import { imageBaseUrl } from "@/lib/constant";
import Image from "next/image";
import Link from "next/link";

const CategoriesCard = ({ data }) => {
  return (
    <Link href={`/gig?categories=${data?.name}`}>
      <div className="w-full h-[300px] md:h-[350px] p-2  cursor-pointer relative rounded-lg border border-gray-300">
        {/* Background Image */}
        <div className="absolute  inset-0">
          <Image
            src={`${imageBaseUrl}${data?.image}`}
            fill
            alt="Categories Background"
            className="rounded-lg"
          />
        </div>

        {/* Overlay Content */}
        <div className="absolute bottom-0  rounded-b-lg  left-0 right-0 px-5 py-2 bg-custom-green rounded-tl-6">
          {/* <p className="text-sm text-white">{data?.description}</p> */}
          <h1 className="text-lg font-bold text-white">{data?.name}</h1>
        </div>
      </div>
    </Link>
  );
};

export default CategoriesCard;
