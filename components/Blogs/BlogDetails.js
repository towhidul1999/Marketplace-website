"use client";
import { MdDateRange } from "react-icons/md";
import BlogDescription from "@/components/Blogs/BlogDescription";
import React from "react";
import baseAxios from "@/lib/config";
import Breadcrumb from "../Layout/Breadcrumb";
import { imageBaseUrl } from "@/lib/constant";
import { LuUser2 } from "react-icons/lu";

function BlogDetails({ slug }) {
  const [data, setData] = React.useState([]);
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

  React.useEffect(() => {
    baseAxios
      .get(`/blog/slug/${slug}`)
      .then((res) => {
        setData(res.data.data.attributes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);
  return (
    <>
      <Breadcrumb
        title={"CNNCTR Blog Details"}
        pathTitle={"Blog"}
        path={"/blogs"}
      />
      <div className="container py-[100px]">
        <div className="">
          <div className="relative overflow-hidden">
            <img
              className="w-full max-h-[550px] rounded-lg"
              src={`${imageBaseUrl}${data?.image}`}
              alt=""
            />
          </div>
        </div>

        <div className="mt-[70px]">
          <div className="h-auto">
            <div>
              <div className="flex text-[#6B6B6B] gap-5 pb-3">
                <div className="flex items-center gap-2">
                  <MdDateRange className="text-primary" />
                  <p>{formatDate(data?.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <LuUser2 className="text-primary" />
                  <p>{data?.author}</p>
                </div>
              </div>
              <h1 className="text-[20px] md:text-[40px] font-medium">
                {data?.title}
              </h1>
            </div>

            {/* Blog Description */}
            <BlogDescription content={data?.description} />
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogDetails;
