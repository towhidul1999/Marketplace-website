"use client";
import { useState } from "react";
import { Drawer, Dropdown, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";
import { imageBaseUrl } from "@/lib/constant";
import Cookies from "js-cookie";
import { logout } from "@/actions/auth.services";
import { toast } from "sonner";
import useUser from "@/hooks/useUser";
import { useGetAllCategoryQuery } from "@/app/redux/features/getAllCategoryApi";
const MobileDrawer = ({ open, onClose }) => {
  const user = useUser();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data } = useGetAllCategoryQuery({});
  const Categories = data?.results?.map((item, index) => ({
    key: `${index + 1}`,
    label: (
      <div
        key={`${index + 1}`}
        onClick={() => {
          router.push(`/gig?categories=${item?.name}`), onClose();
        }}
        className="hover:text-primary"
      >
        {item?.name}
      </div>
    ),
  }));

  const handleLogout = () => {
    const refreshToken = Cookies.get("refreshToken");
    logout(refreshToken)
      .then((res) => {
        toast.success("Logout successfully");
        localStorage.removeItem("accessToken");
        Cookies.remove("user");
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        router.push("/sign-in");
      })
      .catch((error) => {
        toast.error(error.message || "Logout failed");
      });
  };

  return (
    <div>
      <Drawer
        extra={
          <Link href="/">
            <Image
              src="/logo-green.svg"
              width={100}
              height={100}
              className="w-full cursor-pointer"
              alt="logo"
            />
          </Link>
        }
        onClose={onClose}
        open={open}
      >
        {user ? (
          <div>
            <Link href="/profile" className="flex items-center gap-2 mb-3">
              <Image
                src={`${imageBaseUrl}${user?.image}`}
                width={50}
                height={50}
                alt="gig"
                className="w-[50px] h-[50px] rounded-full"
              />
              {user && user?.role == "freelancer" && (
                <p className="text-[17px] font-bold ">${user?.balance}</p>
              )}
            </Link>
            {user && user?.role == "freelancer" && (
              <Link href="/dashboard">
                <p className="text-[16px] py-1.5">Dashboard</p>
              </Link>
            )}

            <Link href="/inbox">
              <p className="text-[16px] py-1.5">Inbox</p>
            </Link>
            {user && user?.role === "freelancer" && (
              <Link href="/earnings">
                <p className="text-[16px] py-1.5">Earnings</p>
              </Link>
            )}
            {user && user?.role === "buyer" && (
              <Link href="/list">
                <p className="text-[16px] py-1.5">My List</p>
              </Link>
            )}
          </div>
        ) : (
          <>
            <Link href="/sign-in">
              <p className="text-[16px] py-1.5">Sign In</p>
            </Link>
          </>
        )}
        <div>
          <div className="text-[16px] py-1.5">
            <Dropdown
              menu={{
                items: Categories,
              }}
              onOpenChange={(open) => setDropdownOpen(open)}
            >
              <div onClick={(e) => e.preventDefault()}>
                <Space>
                  <div className="flex justify-between items-center gap-[236px] group">
                    <p>Category</p>
                    <div>
                      {dropdownOpen ? (
                        <IoIosArrowDown />
                      ) : (
                        <MdArrowForwardIos />
                      )}
                    </div>
                  </div>
                </Space>
              </div>
            </Dropdown>
          </div>
        </div>
        <Link href="/">
          <p className="text-[16px] py-1.5">Home</p>
        </Link>

        {user && (
          <div
            onClick={() => handleLogout()}
            className="transition-colors duration-200 hover:text-primary text-[15px] cursor-pointer font-medium mt-5"
          >
            Logout
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default MobileDrawer;
