"use client";
import { imageBaseUrl } from "@/lib/constant";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoMdArrowForward } from "react-icons/io";
import { MdDateRange } from "react-icons/md";

function BlogCard({ item }) {
  const router = useRouter();

  function formatDate(dateString) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(dateString);
    const month = months[date.getMonth()];
    const day = ("0" + date.getDate()).slice(-2);
    const year = date.getFullYear().toString().slice(-2);

    return `${month} ${day}, ${year}`;
  }

  return (
    <div className="rounded-lg bg-white overflow-hidden max-w-[380px] p-[16px] shadow-lg">
      <div className="relative overflow-hidden">
        <Image
          src={item?.image ? `${imageBaseUrl}${item?.image}` : ""}
          width={500}
          height={500}
          alt="Blog Image"
          className="w-full h-[250px] rounded-lg"
        />
      </div>
      <div className="px-[5px] mt-[16px]">
        <div className="flex text-[#6B6B6B] gap-5 border-b-2 pb-3">
          <div className="flex items-center gap-2">
            <MdDateRange />
            <p> {formatDate(item?.createdAt)}</p>
            {/* <p> October 04, 2024</p> */}
          </div>
        </div>
        <h1 className="text-[20px] font-medium mt-3">
          {item?.title?.length > 20
            ? item?.title?.slice(0, 20) + "..."
            : item?.title}
        </h1>
        <button
          onClick={() => router.push(`/blogs/${item?.slug}`)}
          className="btn btn-primary mt-[20px] text-primary hover:text-white hover:bg-primary transition-all flex items-center gap-2 border-primary border-2 rounded-lg px-5 py-2 md:py-2"
        >
          <span>Read More</span> <IoMdArrowForward />
        </button>
      </div>
    </div>
  );
}

export default BlogCard;
