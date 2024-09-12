"use client";
import { useRouter } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoCallOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";

function Footer() {
  const router = useRouter();
  return (
    <footer className="bg-primary text-white body-font">
      <div className="border-white border-b-[1px]">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col ">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <div className="flex title-font font-medium items-center md:justify-start justify-center text-white"></div>
            <p
              // onClick={() => sendEvent("user/connect", { userId })}
              className="mt-2 text-sm text-white cursor-pointer"
            >
              Our team of experienced professionals is dedicated to delivering
              exceptional testing services, backed by years of industry
              knowledge and expertise.
            </p>

            <div className="flex gap-2 mt-4">
              <p className="text-white text-[20ph]">Visit Our:</p>

              <a href="https://www.facebook.com/cannctr" target="_blank">
                <FaFacebookF className="text-primary bg-white w-8 h-8 p-2 rounded-full cursor-pointer " />
              </a>

              <a href="https://www.instagram.com/cannctr/" target="_blank">
                <FaInstagram className="text-primary bg-white w-8 h-8 p-2 rounded-full cursor-pointer " />
              </a>
              <a
                href="https://www.linkedin.com/company/cannctr/"
                target="_blank"
              >
                <FaLinkedinIn className="text-primary bg-white w-8 h-8 p-2 rounded-full cursor-pointer " />
              </a>
              <a href="https://twitter.com/cannctr" target="_blank">
                <FaTwitter className="text-primary bg-white w-8 h-8 p-2 rounded-full cursor-pointer " />
              </a>

              <div></div>
            </div>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-[20px] mb-3">
                Company
              </h2>
              <nav className="list-none mb-10 flex gap-3 flex-col">
                <li>
                  <div
                    onClick={() => router.push("/about-us")}
                    className="text-white hover:text-gray-800 cursor-pointer transition-all"
                  >
                    About Us
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => router.push("/services")}
                    className="text-white hover:text-gray-800 cursor-pointer transition-all"
                  >
                    All Services
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => router.push("/contact-us")}
                    className="text-white hover:text-gray-800 cursor-pointer transition-all"
                  >
                    Contact Us
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => router.push("/blogs")}
                    className="text-white hover:text-gray-800 cursor-pointer transition-all"
                  >
                    Blogs
                  </div>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-[20px] mb-3">
                Quick Link
              </h2>
              <nav className="list-none mb-10 flex gap-3 flex-col">
                <li>
                  <div
                    onClick={() => router.push("/privacy-policy")}
                    className="text-white hover:text-gray-800 cursor-pointer transition-all"
                  >
                    Privacy Policy
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => router.push("/terms-of-service")}
                    className="text-white hover:text-gray-800 cursor-pointer transition-all"
                  >
                    Terms of Service
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => router.push("/trust-safety")}
                    className="text-white hover:text-gray-800 cursor-pointer transition-all"
                  >
                    Trust & Safety
                  </div>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-[20px] mb-3">
                Contact us
              </h2>
              <nav className="list-none mb-10 flex gap-3 flex-col items-center md:items-start">
                <li className="flex items-center gap-2 cursor-pointer">
                  <HiOutlineMailOpen className="text-primary bg-white w-8 h-8 p-2 rounded-full " />
                  <p>info@cnnctr.com.au</p>
                </li>
                <li className="flex items-center gap-2 cursor-pointer">
                  <IoCallOutline className="text-primary bg-white w-8 h-8 p-2 rounded-full  " />
                  <p>866-566-0261</p>
                </li>
                <li className="flex items-center gap-2 cursor-pointer">
                  <SlLocationPin className="text-primary bg-white w-8 h-8 p-2 rounded-full  " />
                  <p className="text-sm w-[200px] md:h-full md:text-base">
                    2972 Westheimer Rd. Santa Ana, Illinois 85486{" "}
                  </p>
                </li>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary">
        <div className="container mx-auto justify-center py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-white flex mx-auto md:mx-0  text-sm text-center sm:text-left">
            Copyright © {new Date().getFullYear()} CNNCTR All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
