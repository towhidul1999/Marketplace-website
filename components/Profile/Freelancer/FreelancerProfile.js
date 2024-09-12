import { useState } from "react";
import Image from "next/image";
import FreelancerMainCard from "./FreelancerMainCard";
import FreelancerOtherCard from "./FreelancerOtherCard";
import useUser from "@/hooks/useUser";
import { imageBaseUrl } from "@/lib/constant";
import { useUpdateCoverImageMutation } from "@/app/redux/features/updateProfileApi";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { setUser } from "@/app/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { IoCameraReverseOutline } from "react-icons/io5";

const FreelancerProfile = () => {
  const user = useUser();
  const [coverImage, setCoverImage] = useState(user?.coverImage);
  const [updateCoverImage,{isLoading:isUploading}] = useUpdateCoverImageMutation()
  const dispatch = useDispatch();

  // Function to handle file selection
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const res = await updateCoverImage(formData);
      if (res.error) {
        console.log(res.error);
        return;
      }if(res.data){
        Cookies.set("user", JSON.stringify(res?.data?.data?.attributes));
        dispatch(setUser(res?.data?.data?.attributes));
        setCoverImage(res?.data?.data?.attributes?.coverImage)
        toast.success("Cover image updated successfully");
      }
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Image
          src={coverImage ? `${imageBaseUrl}${coverImage}` : "/demoCover.jpg"}
          width={1920}
          height={1080}
          className="w-full h-[170px] md:h-[350px] bg-center"
          alt="Cover Image"
        />

        {/* Icon for changing the cover image */}
        <div className="absolute bottom-0 right-10">
          <label
            htmlFor="coverImageUpload"
            className="cursor-pointer p-2  text-white rounded-full"
          >
            <IoCameraReverseOutline className="size-8" />
          </label>
          <input
            id="coverImageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            disabled={isUploading} // Disable input while uploading
          />
        </div>
      </div>

      <div className="container flex flex-col md:flex-row py-10 md:gap-7">
        <div className="md:w-1/3">
          <FreelancerMainCard />
        </div>
        <div className="md:w-2/3">
          <FreelancerOtherCard />
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
