"use client";
import { Checkbox, Input, Form } from "antd";
import Link from "next/link";
import { userLogin } from "@/actions/userLogin";
import { storeUserInfo } from "@/actions/auth.services";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/slices/userSlice";
import { toast } from "sonner";
import Button from "../CustomCreate/Button";

const SignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (values) => {
    try {
      const res = await userLogin({
        email: values.email,
        password: values.password,
      });
      if (res?.data?.attributes?.tokens?.access?.token) {
        storeUserInfo({
          accessToken: res?.data?.attributes?.tokens?.access?.token,
        });
        Cookies.set("user", JSON.stringify(res?.data?.attributes?.user));
        Cookies.set(
          "accessToken",
          JSON.stringify(res?.data?.attributes?.tokens?.access?.token)
        );
        Cookies.set(
          "refreshToken",
          JSON.stringify(res?.data?.attributes?.tokens?.refresh?.token)
        );
        dispatch(setUser(res?.data?.attributes?.user));
        router.push("/");
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <main className="flex justify-center items-center px-3">
      <div className="w-[500px] border border-green-500 p-12 my-16 rounded-xl">
        <h1 className="text-xl font-medium text-center">
          Start living your work dream
        </h1>

        <Form onFinish={handleSubmit} autoComplete="on" className="mt-4">
          <div className="flex gap-3 flex-col  pt-5 pb-2">
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
          <div className="flex gap-3 justify-between py-2 flex-wrap mb-4">
            <div>
              <Checkbox>Keep me logged in</Checkbox>
            </div>
            <div
              onClick={() => {
                router.push("/forgot-password");
              }}
              className="text-primary cursor-pointer"
            >
              Forgot password?
            </div>
          </div>

          <Button name={"Sign In"} />
        </Form>

        <div className="flex justify-center">
          <p className="text-[15px] text-textGray mt-[16px]">
            Don&lsquo;t have an account?{" "}
            <Link href="/sign-up">
              {" "}
              <span className="text-primary cursor-pointer ">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
