"use client";
import React, { useState, useEffect } from "react";
import { Form, Input } from "antd";
import { Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { WithContext as ReactTags } from "react-tag-input";
import { useDispatch } from "react-redux";
import {
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
} from "@/app/redux/features/updateProfileApi";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LuImagePlus } from "react-icons/lu";
import { imageBaseUrl } from "@/lib/constant";
import Cookies from "js-cookie";
import { setUser } from "@/app/redux/slices/userSlice";
import useUser from "@/hooks/useUser";
import { toast } from "sonner";
const FreelancerEditProfile = () => {
  const loginUser = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState();
  const [file, setFile] = useState();
  const [tags, setTags] = useState(loginUser?.skills || []);
  useEffect(() => {
    setTags(loginUser?.skills);
  }, []);
  const [updateImage] = useUpdateProfileImageMutation();
  const [setProfile,{isLoading}] = useUpdateProfileMutation();

  if (!loginUser) {
    toast.warning("You are not logged in");
    router.push("/sign-in");
  }
  const handleAddEvent = async (values) => {
    const result = {
      ...values,
      skills: tags,
    };

    try {
      const res = await setProfile(result);
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
          text: "Profile updated successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/profile");
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err?.data?.message || "Failed to update profile",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    if (tags.length <= 10) {
      setTags([...tags, { id: tag?.id, text: tag?.text }]);
    } else {
      message.warning("You can only add up to 10 skills.");
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
          toast.error(res.error.data.message || "Failed to update profile");
          return;
        } else if (res.data) {
          Cookies.set("user", JSON.stringify(res?.data?.data?.attributes));
          dispatch(setUser(res?.data?.data?.attributes));
          toast.success("Profile updated successfully");
          setFile(null);
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
            src={imageUrl ? imageUrl : `${imageBaseUrl}${loginUser?.image}`}
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
            fullName: loginUser?.fullName,
            intro: loginUser?.intro,
            about: loginUser?.about,
            location: loginUser?.location,
            perHourRate: loginUser?.perHourRate,
            skills: loginUser?.skills,
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
              name="intro"
              label={<span className="text-[18px] ">Job Title</span>}
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input Job Title!",
                },
              ]}
            >
              <Input
                placeholder="Job Title"
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
              label={<span className="text-[18px]">Your Skills (Max 10)</span>}
              name="skills"
              className="flex-1"
            >
              <ReactTags
               tags={tags || loginUser?.skills || []}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                allowDragDrop={false}
                placeholder="Add a skill"
                classNames={{
                  tagInput: "tag-input",
                  tagInputField:
                    "tag-input-field border border-gray-300 outline-none focus:border-blue-500 rounded-md",
                  selected: "selected-tag",
                  tag: "bg-green-500 border border-gray-300 rounded-full px-5 py-2 mr-3 text-white",
                  remove:"tag-remove"
                }}
                
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
          <div className="flex-1 mt-[16px]">
            <Form.Item
              name="perHourRate"
              label={<span className=" text-[18px] ">Per hour rate</span>}
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input Per hour rate!",
                },
              ]}
            >
              <Input
                placeholder="500"
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
            loading={isLoading}
            ht
            block
            className="w-full my-[30px] px-2 py-4  text-white bg-primary hover:bg-primary active:bg-primary"
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

export default FreelancerEditProfile;
