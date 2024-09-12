"use client";
import { Form, Input } from "antd";
import { GoArrowLeft } from "react-icons/go";
import { usePostForgotPasswordMutation } from "@/app/redux/features/postForgotPasswordApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Button from "../CustomCreate/Button";

const ForgotPassword = () => {
  const [setForgotData,{isLoading}] = usePostForgotPasswordMutation();
  const router = useRouter();
  const onFinish = async (values) => {
    try {
      const response = await setForgotData(values);
      if (response?.error) {
        toast.error(response?.error?.data?.message);
      }
      if (response?.data?.code == 200) {
        toast.success("Verify Otp send your email!");
        router.push(`verify-email?email=${values.email}`);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <div className="flex justify-center items-center ">
      <div className="w-[500px] border border-green-500 p-12 my-16 rounded-xl">
        <div
          onClick={() => router.push("/sign-in")}
          className="flex items-center justify-center gap-2"
        >
          <GoArrowLeft className="text-[32px] cursor-pointer" />
          <h1 className="text-[24px] font-medium my-[24px]">Forgot password</h1>
        </div>
        <p className="text-center mx-auto w-[80%] font-medium mb-[24px] text-[#5C5C5C] text-[16px]">
          Please enter your email address to reset your password.
        </p>
        <Form
          name="normal_login"
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 40 }}
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          className="space-y-1"
        >
          <Form.Item
            className="w-full text-start"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              placeholder="Enter your email"
              className="w-full py-2 outline-none hover:border-gray-300 focus:outline-none focus:border-green-500"
            />
          </Form.Item>

          <Form.Item>
           <Button loading={isLoading} name={"Send OTP"}/>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
