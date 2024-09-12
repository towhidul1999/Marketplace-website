"use client";
import { Form, Input } from "antd";
import { GoArrowLeft } from "react-icons/go";
import Button from "../CustomCreate/Button";
import { useRouter } from "next/navigation";
import { usePostResetPasswordMutation } from "@/app/redux/features/postResetPassword";
import { toast } from "sonner";

const ChangePassword = ({ searchParams }) => {
  const router = useRouter();
  const [setNewPassword] = usePostResetPasswordMutation();

  const handleSubmit = async (values) => {
    const { new_password } = values;
    const res = await setNewPassword({
      password: new_password,
      ...searchParams,
    });
    if (res.error) {
      toast.error(res?.error?.data?.message);
    }
    if (res.data) {
      toast.success(res?.data?.message);
      router.push("/sign-in");
    }
  };

  return (
    <main className="flex justify-center items-center px-3">
      <div className="w-[500px] border border-green-500 p-8 my-16 rounded-xl">
        <div
          onClick={() => router.push("/sign-in")}
          className="flex items-center justify-center gap-2"
        >
          <GoArrowLeft className="text-[32px] cursor-pointer" />
          <h1 className="text-[24px] font-medium my-[24px]">Change password</h1>
        </div>
        <p className="text-center mx-auto w-[80%] font-medium mb-[24px] text-[#5C5C5C] text-[16px]">
          Please enter your new password to reset your password.
        </p>
        <Form
          name="normal_login"
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 40 }}
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
          className="space-y-1"
        >
          <Form.Item
            className="w-full text-start"
            name="new_password"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long!",
              },
              {
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain at least one letter, one number, and one special character!",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your new password"
              className="w-full py-2 outline-none hover:border-gray-300 focus:outline-none focus:border-green-500"
            />
          </Form.Item>
          <Form.Item
            className="w-full text-start"
            name="confirm_password"
            dependencies={["new_password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your new password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm your new password"
              className="w-full py-2 outline-none hover:border-gray-300 focus:outline-none mb-5 focus:border-green-500"
            />
          </Form.Item>

          <Form.Item>
            <Button name={"Change Password"} />
          </Form.Item>
        </Form>
      </div>
    </main>
  );
};

export default ChangePassword;
