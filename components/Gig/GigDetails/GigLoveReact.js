"use client";
import { usePostDisLoveMutation } from "@/app/redux/features/postDisLoveApi";
import { usePostLoveReactMutation } from "@/app/redux/features/postLoveReactApi";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";

function GigLoveReact({ result, isLoved }) {
  const [setLoveReactId] = usePostLoveReactMutation();
  const [setDisLoveId] = usePostDisLoveMutation();
  const handleLoveReact = async () => {
    const response = await setLoveReactId(result?._id);
    if (response?.data?.code === 201) {
      toast.success("The item saved in My list.");
    }
  };
  const handleDisLoveReact = async () => {
    const response = await setDisLoveId(result?._id);
    if (response?.data?.code === 201) {
      toast.success("The item remove in My list.");
    }
  };
  return (
    <div className="flex gap-2 float-end items-center space-x-2 px-5 py-1 rounded-lg">
      <div className="cursor-pointer text-2xl">
        {isLoved ? (
          <FaHeart onClick={handleDisLoveReact} className="text-red-500" />
        ) : (
          <FaHeart onClick={handleLoveReact} className="text-gray-500" />
        )}
      </div>
    </div>
  );
}

export default GigLoveReact;
