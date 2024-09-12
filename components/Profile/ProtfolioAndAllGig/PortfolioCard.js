import { usePostProtfolioDeleteMutation } from "@/app/redux/features/postProtfolioDeleteApi";
import { imageBaseUrl } from "@/lib/constant";
import { Image } from "antd";
import React from "react";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";

function PortfolioCard({ data }) {
  const [setDeleteData] = usePostProtfolioDeleteMutation();
  const handleRemoveImage = async (id) => {
    try {
      const response = await setDeleteData(id);
      if (response?.data?.code === 200) {
        Swal.fire({
          title: "Success!",
          text: `${response?.data?.message}`,
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error?.data?.message || "Failed to delete image",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <div className="w-full h-[200px] relative">
      <Image
        width="100%"
        height="100%"
        src={`${imageBaseUrl}${data?.image}`}
        className=" rounded-lg my-2"
        alt="Portfolio Image"
      />
      <TiDelete
        size={25}
        style={{
          position: "absolute",
          top: "-3px",
          right: "-10px",
          color: "red",
          cursor: "pointer",
        }}
        onClick={() => handleRemoveImage(data?._id)}
      />
    </div>
  );
}

export default PortfolioCard;
