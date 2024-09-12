"use client";
import React, { useState, useEffect } from "react";
import { Form, Input } from "antd";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from "react-redux";
import {
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
} from "@/app/redux/features/updateProfileApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LuImagePlus } from "react-icons/lu";
import { imageBaseUrl } from "@/lib/constant";
import Cookies from "js-cookie";
import { setUser } from "@/app/redux/slices/userSlice";
import { toast } from "sonner";
import Swal from "sweetalert2";
import useUser from "@/hooks/useUser";
const BuyerEditProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useUser();
  const [imageUrl, setImageUrl] = useState();
  const [file, setFile] = useState();
  const [updateImage] = useUpdateProfileImageMutation();
  const [setProfile] = useUpdateProfileMutation();
  const handleAddEvent = async (values) => {
    const result = {
      ...values,
    };
    try {
      const res = await setProfile(result);
      if (res.error) {
        toast.error(res.error?.data?.message || "Failed to update profile");
        return;
      } else if (res.data) {
        Cookies.set("user", JSON.stringify(res?.data?.data?.attributes));
        dispatch(setUser(res?.data?.data?.attributes));
        toast.success("Profile updated successfully");
        setImageUrl(null);
        router.push("/profile");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    }
  };
  const handleSetImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };
  const handleImageChange = async () => {
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
      const res = await updateImage(formData);
      try {
        if (res.error) {
          Swal.fire({
            title: "Error!",
            text: res.error.data.message || "Failed to update profile",
            icon: "error",
            confirmButtonText: "OK",
          });
          return;
        } else if (res.data) {
          Cookies.set("user", JSON.stringify(res?.data?.data?.attributes));
          dispatch(setUser(res?.data?.data?.attributes));
          Swal.fire({
            title: "Success!",
            text: "Profile image updated successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/profile");
        }
      } catch (error) {}
    }
  };
  return (
    <div className="container">
      <div className="py-5">
        <h1 className="text-[24px] font-medium">Edit your Profile</h1>
        <p className="text-textGray">
          Complete your profile and keep it updated to help us connect you with
          the right people.
        </p>
      </div>
      <div>
        <div className="mb-[12px] relative">
          <Image
            width={56}
            height={56}
            className="size-24 rounded-full"
            src={imageUrl ? imageUrl : `${imageBaseUrl}${user?.image}`}
            alt="profile image"
          />
          <label
            htmlFor="image"
            className="absolute size-24 rounded-full flex justify-center items-center bg-opacity-30 bg-gray-500 top-0 right-0 bottom-0 left-0 cursor-pointer"
          >
            <LuImagePlus className="size-6 text-white" />
          </label>
          <input
            onChange={handleSetImage}
            type="file"
            name="image"
            id="image"
            className="hidden"
          />
          <button
            onClick={handleImageChange}
            className="text-[14px] mt-3 font-medium text-white bg-green-600 hover:bg-green-700 px-8 py-2 rounded-md"
          >
            Save
          </button>
        </div>
        <Form
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 40 }}
          layout="vertical"
          initialValues={{
            fullName: user?.fullName,
            about: user?.about,
            location: user?.location,
          }}
          onFinish={handleAddEvent}
          autoComplete="off"
        >
          <div className="flex gap-5">
            <Form.Item
              name="fullName"
              label={<span className=" text-[18px] ">Full Name</span>}
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input your Full Name!",
                },
              ]}
            >
              <Input
                placeholder="Full Name"
                className="p-4 bg-[#F5F5F5]
              rounded w-full 
              justify-start 
              mt-[12px]
              items-center 
              gap-4 inline-flex hover:bg=[#F5F5F5]"
              />
            </Form.Item>
          </div>
          <div className="flex gap-5">
            <Form.Item
              name="about"
              label={<span className=" text-[18px] ">About You</span>}
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input About You!",
                },
              ]}
            >
              <TextArea
                className="p-4 bg-[#F5F5F5]
              rounded w-full 
              justify-start 
              mt-[12px]
              items-center 
              gap-4 inline-flex hover:bg=[#F5F5F5]"
                rows={4}
                placeholder="About You"
              />
            </Form.Item>
          </div>

          <div className="flex-1 mt-[16px]">
            <Form.Item
              name="location"
              label={<span className=" text-[18px] ">Location</span>}
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input Location!",
                },
              ]}
            >
              <Input
                placeholder="Location"
                className="p-4 bg-[#F5F5F5]
              rounded w-full 
              justify-start 
              mt-[12px]
              items-center 
              gap-4 inline-flex hover:bg=[#F5F5F5]"
              />
            </Form.Item>
          </div>
          <Button
            htmlType="submit"
            block
            className="block w-[500px] h-[56px] my-[30px] px-2 py-4  text-white bg-primary hover:bg-primary active:bg-primary"
            style={{
              marginTop: "30px",
              backgroundColor: "#00BF63",
              color: "#fff",
              size: "18px",
              height: "56px",
            }}
          >
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default BuyerEditProfile;
