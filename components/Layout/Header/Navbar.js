"use client";
import { logout } from "@/actions/auth.services";
import { useGetUserQuery } from "@/app/redux/features/getSingleUserApi";
import { setUser } from "@/app/redux/slices/userSlice";
import useUser from "@/hooks/useUser";
import baseURL from "@/lib/config";
import { imageBaseUrl } from "@/lib/constant";
import { Dropdown, Form, Input, Select } from "antd";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdHeartEmpty } from "react-icons/io";
import {
  IoChevronDown,
  IoChevronUp,
  IoNotificationsOutline,
  IoSearch,
} from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import MobileDrawer from "./MobileDrawer";

export const Navbar = () => {
  const user = useUser();
  const { data: userData } = useGetUserQuery(user?.id, {
    skip: !user?.id,
  });
  const userTransformData = userData?.data?.attributes?.user;
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const user = Cookies.get("user");
      if (user && JSON.parse(user).id) {
        const res = await baseURL.get(`/users/${JSON.parse(user).id}`);
        if (res?.data?.code === 200) {
          dispatch(setUser(res.data?.data?.attributes?.user));
        }
      }
    };

    fetchData();
  }, [dispatch]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const profileLinks = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            router.push("/profile");
          }}
          className="px-4 py-2 transition-colors duration-200 hover:text-primary text-[15px] cursor-pointer font-medium"
        >
          Profile
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            router.push("/dashboard");
          }}
          className="px-4 py-2 transition-colors duration-200 hover:text-primary text-[15px] cursor-pointer font-medium"
        >
          Dashboard
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => {
            router.push("/inbox");
          }}
          className="px-4 py-2 transition-colors duration-200 hover:text-primary text-[15px] cursor-pointer font-medium"
        >
          Inbox
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div
          onClick={() => {
            router.push("/order");
          }}
          className="px-4 py-2 transition-colors duration-200 hover:text-primary text-[15px] cursor-pointer font-medium"
        >
          Order
        </div>
      ),
    },
    user &&
      user?.role === "freelancer" && {
        key: "5",
        label: (
          <div
            onClick={() => {
              router.push("/earnings");
            }}
            className="px-4 py-2 transition-colors duration-200 hover:text-primary text-[15px] cursor-pointer font-medium"
          >
            Earnings
          </div>
        ),
      },
    {
      key: "6",
      label: (
        <div
          onClick={() => handleLogout()}
          className="px-4 py-2 transition-colors duration-200 hover:text-primary text-[15px] cursor-pointer font-medium"
        >
          Logout
        </div>
      ),
    },
  ];

  const handleLogout = () => {
    const refreshToken = Cookies.get("refreshToken");

    logout(refreshToken)
      .then((res) => {
        toast.success("Logout Successfully");
        localStorage.removeItem("accessToken");
        Cookies.remove("user");
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        dispatch(setUser(null));
        router.push("/sign-in");
      })
      .catch((error) => {
        toast.error(error.message || "Logout failed");
      });
    setIsLogin(false);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const select = form.selectedName.value;
    const title = form.title.value;
    if (title && select === "hire-freelancers") {
      router.push(`/${select}?name=${title}`);
      form.reset();
    }
    if (title && select === "gig") {
      router.push(`/${select}?title=${title}`);
      form.reset();
    }
  };

  const notificationItems = [
    {
      key: "1",
      label: (
        <div className="p-2 cursor-pointer flex items-center gap-2">
          <p className="text-sm">New message from John Doe</p>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="p-2 cursor-pointer flex items-center gap-2">
          <p className="text-sm">Order #1234 has been completed</p>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="p-2 cursor-pointer">
          <p className="text-sm">Your gig has been approved</p>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* mobile menu */}
      <div className="flex md:hidden justify-between items-center px-[10px] py-[18px]">
        <div>
          <Link href="/">
            <Image
              src="/logo-green.svg"
              width={100}
              height={100}
              className="w-full"
              alt=" logo"
            />
          </Link>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <IoSearch className="w-[20px] h-[20px] cursor-pointer" />
          {/* <GrLocation className="w-[20px] h-[20px] cursor-pointer" /> */}
          <HiOutlineMenu
            onClick={showDrawer}
            className="w-[20px] h-[20px] cursor-pointer"
          />
        </div>
      </div>

      {/* desktop menu */}
      <div className="hidden md:flex bg-primary px-[10px] py-[24px]">
        <div className="container flex items-center justify-between ">
          <div className="flex items-center justify-center space-x-4">
            <Link href="/">
              <Image
                src="/logo-white.svg"
                width={100}
                height={100}
                className="w-[200px] cursor-pointer"
                alt="logo"
              />
            </Link>
            <div className="flex items-center space-x-2 cursor-pointer">
              {/* <div className="p-2 bg-white rounded-full ">
                <GrLocation className="w-[20px]  text-primary h-[20px]" />
              </div>
              <p className="text-[16px] text-white">{address ? address : 'Set Location'}</p> */}
            </div>
          </div>
          <div>
            {user ? (
              <div className="flex gap-4">
                <div className="flex items-center justify-center cursor-pointer gap-3 px-2 py-1 bg-white rounded-lg shadow-lg">
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center space-x-2"
                  >
                    <div className="relative flex items-center">
                      <select
                        defaultValue="gig"
                        name="selectedName"
                        className="block w-[100px] px-3 py-2 text-sm rounded-md appearance-none outline-none"
                        onFocus={() => setIsOpen(true)}
                        onBlur={() => setIsOpen(false)}
                      >
                        <option value="gig">Gig</option>
                        <option value="hire-freelancers">Freelancer</option>
                      </select>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        {isOpen ? (
                          <IoChevronUp className="w-4 h-4 text-gray-600 transition-transform duration-300 ease-in-out" />
                        ) : (
                          <IoChevronDown className="w-4 h-4 text-gray-600 transition-transform duration-300 ease-in-out" />
                        )}
                      </div>
                    </div>
                    <input
                      type="text"
                      name="title"
                      className="w-36 p-2 rounded-md text-sm outline-none"
                      placeholder="Search gig or freelancer..."
                    />
                    <button
                      type="submit"
                      className="p-2 rounded-full bg-primary hover:bg-primary-dark transition-colors duration-300"
                    >
                      <IoSearch className="w-5 h-5 text-white" />
                    </button>
                  </form>
                </div>
                <div className="flex items-center justify-center gap-4">
                  {user && user?.role === "buyer" && (
                    <div className="p-2 bg-white cursor-pointer rounded-full ">
                      <Link href="/list">
                        <IoMdHeartEmpty className="size-5 text-primary" />
                      </Link>
                    </div>
                  )}
                  <div className="p-2 bg-white cursor-pointer rounded-full ">
                    <Link href="/inbox">
                      <MdOutlineEmail className="size-5 text-primary" />
                    </Link>
                  </div>
                  <Dropdown
                    overlayClassName="custom-dropdown"
                    overlayStyle={{
                      borderRadius: "12px",
                      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
                    }}
                    menu={{
                      items: notificationItems,
                    }}
                    placement="bottomRight"
                    arrow
                  >
                    <div className="p-2 bg-white cursor-pointer rounded-full ">
                      <IoNotificationsOutline className="size-5 text-primary" />
                    </div>
                  </Dropdown>
                </div>
                <div className="flex items-center justify-center gap-4 cursor-pointer">
                  {user && user?.role === "freelancer" && (
                    <p className="text-white text-[17px] font-bold ">
                      ${userTransformData?.balance}
                    </p>
                  )}
                  <Dropdown
                    menu={{
                      items: profileLinks,
                    }}
                    placement="bottomRight"
                    arrow
                  >
                    <div onClick={(e) => e.preventDefault()}>
                      <div className="p-1 rounded-full bg-secondary ">
                        <Image
                          src={`${imageBaseUrl}${user?.image}`}
                          width={50}
                          height={50}
                          alt="gig"
                          className="w-[35px] h-[35px] rounded-full"
                        />
                      </div>
                    </div>
                  </Dropdown>
                </div>
              </div>
            ) : (
              <Link href="/sign-in">
                <div className="flex items-center justify-center gap-4 cursor-pointer">
                  <p className="text-white text-[16px] ">Create your account</p>
                  <div className="p-2 bg-white rounded-full ">
                    <FaUserLarge className="w-[20px]  text-primary h-[20px]" />
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      <MobileDrawer
        open={open}
        onClose={onClose}
        setOpen={setOpen}
        showDrawer={showDrawer}
        user={user}
      />
    </div>
  );
};

export default Navbar;
