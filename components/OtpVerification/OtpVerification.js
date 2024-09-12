"use client";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { GoArrowLeft } from "react-icons/go";
import { useRouter } from "next/navigation";
import { usePostOtpVerifyMutation } from "@/app/redux/features/postOtpVerifyApi";
import { toast } from "sonner";
import Button from "../CustomCreate/Button";

const OtpVerification = ({ searchParams }) => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [setOtpData, { isLoading }] = usePostOtpVerifyMutation();
  const handleMatchOtp = async () => {
    const data = {
      ...searchParams,
      oneTimeCode: otp, 
    };
    try {
      const response = await setOtpData(data);
      if (response.error) {
        if(response?.error?.data?.message === 'Reset password otp successfully verified'){
          toast.success("Otp verified successfully")
         router.push(`/change-password?email=${searchParams.email}`);
         return
        }
        toast.error(response?.error?.data?.message);
      }
      if (response?.data?.code === 200) {
        toast.success(response?.data?.message);
        router.push('/sign-in ')
      }
    } catch (error) {
      toast.error(response?.error?.data?.message);
    }
  };
  return (
    <div className="flex justify-center items-center ">
      <div className="w-[500px] border border-green-500 p-12 my-16 rounded-xl">
          <div
            onClick={() => router.push("/forgot-password")}
            className="flex justify-center items-center gap-2 cursor-pointer"
          >
           <GoArrowLeft className="text-[24px] md:text-[32px]" />
            <h1 className="text-[20px] md:text-[24px] font-medium my-[24px] ">
              Verify OTP
            </h1>
          </div>
          <p className="text-[16px] md:text-[20px] text-[#5C5C5C] mb-[24px] md:mb-[32px]">
            Please enter the OTP we have sent you in your email.
          </p>
          <div className="space-y-7 fit-content object-contain">
            <div className="flex items-center gap-2 outline-none focus:border-blue-400 object-contain w-full max-w-[500px] mx-auto">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                inputStyle={{
                  height: "50px",
                  background: "#E8EBF0",
                  fontWeight: "bold",
                  fontSize: "25px",
                  width: "30%",
                  border: "1px solid #193664",
                  marginRight: "16px",
                  outline: "none",
                  color: "black",
                }}
                renderSeparator={<span> </span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="h-[40px] w-[40px] md:h-[50px] md:w-[50px] bg-[#E8EBF0] border border-[#193664] outline-none text-black mr-2 md:mr-4"
                  />
                )}
              />
            </div>

            <div onClick={handleMatchOtp}>
              <Button loading={isLoading} name={"Verify"} />
            </div>
          </div>
        </div>
    </div>
  );
};

export default OtpVerification;
