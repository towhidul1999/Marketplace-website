"use client";
import React, { useState } from "react";
import { Form, Input } from "antd";
import Link from "next/link";
import { registerUser } from "@/actions/registerUser";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Button from "../CustomCreate/Button";

function SignUp() {
  const [role, setRole] = useState("freelancer");
  const router = useRouter();

  const handleSubmit = async (values) => {
    const newUser = {
      fullName: values.firstName + " " + values.lastName,
      email: values.email,
      password: values.password,
      role: role,
    };
    try {
      const res = await registerUser(newUser);
      if (res?.code == 201) {
        router.push(`/verify-email?email=${values.email}`);
        toast.success(res?.message)
      } else {
        toast.error(res?.message)
      }

    } catch (error) {
      toast.error(error?.message)
    }
  };
  return (
    <main className="flex justify-center items-center px-3">
      <div className="w-[600px] border border-green-500 p-12 my-16 rounded-xl">
        <h1 className="text-xl font-medium text-center">Start living your work dream</h1>
        <p className="text-[15px] text-textGray mt-[16px] text-center">
          What do you want to do? (you can edit this later)
        </p>
        <div className="flex gap-3 flex-col md:flex-row  mt-[16px]">
          <div
            onClick={() => setRole("freelancer")}
            className={`cursor-pointer ring-1 ring-primary text-sm  text-primary py-2 px-3 rounded text-center  hover:bg-primary hover:text-white transition duration-300 ${role === "freelancer" ? "text-white bg-primary " : ""
              }`}
          >
            I WANT TO WORK AS A FREELANCER
          </div>
          <div
            onClick={() => setRole("buyer")}
            className={`cursor-pointer text-sm ring-1 ring-primary  text-primary py-2 px-3 rounded text-center hover:bg-primary hover:text-white transition duration-300 ${role === "buyer" ? "text-white bg-primary " : ""
              }`}
          >
            I WANT TO HIRE A FREELANCER
          </div>
        </div>
        <Form
          onFinish={handleSubmit}
          // onFinishFailed={onFinishFailed}
          autoComplete="on"
          className="mt-4"
        >
          <div className="flex gap-3 flex-col md:flex-row pt-5 pb-2">
            <Form.Item
              className="w-full text-start"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please input your first name!",
                },
              ]}
            >
              <Input placeholder="First Name" className="w-full py-2" />
            </Form.Item>
            <Form.Item
              className="w-full text-start"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please input your last name!",
                },
              ]}
            >
              <Input placeholder="Last Name" className="w-full py-2" />
            </Form.Item>
          </div>
          <div className="flex gap-3 flex-col md:flex-row  pb-2">
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
              <Input placeholder="Enter your email" className="w-full py-2" />
            </Form.Item>
            <Form.Item
              className="w-full text-start"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                className="w-full py-2"
              />
            </Form.Item>
          </div>
          <Button  name={"Sign Up"} />
        </Form>

        <div className="flex justify-center ">
          <p className="text-[15px] text-textGray mt-[16px]">
            Already have an account?{" "}
            <Link href="/sign-in">
              <span className="text-primary cursor-pointer ">Log In</span>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default SignUp;
