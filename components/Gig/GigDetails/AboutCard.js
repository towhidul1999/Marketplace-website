import { useAddMessageMutation } from "@/app/redux/features/inbox/inboxApi";
import { useCreateBuyerOrderMutation } from "@/app/redux/features/order/buyerOrderApi";
import useUser from "@/hooks/useUser";
import { imageBaseUrl } from "@/lib/constant";
import { Drawer, Modal } from "antd";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoMdArrowForward } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Swal from "sweetalert2";
const AboutCard = ({ gig, user, setOpen, open }) => {
  const loginUserData = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [addMessage] = useAddMessageMutation();
  const [createOrder] = useCreateBuyerOrderMutation();
  const router = useRouter();
  const { feature } = useSelector((state) => state.feature);

  const showDrawer = () => {
    if (!loginUserData) {
      toast.warning("You need to sign in to create an order.");
      router.push("/sign-in");
      return;
    }
    setOpen(true);
  };
  const showModal = () => {
    if (!loginUserData) {
      toast.warning("You need to sign in to send a message.");
      router.push("/sign-in");
      return;
    }
    setOpenModal(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    if (!loginUserData) {
      toast.warning("You need to sign in to create an order.");
      router.push("/sign-in");
      return;
    }
    e.preventDefault();
    const message = e.target.message.value;
    const formdata = new FormData();
    formdata.append("receiver", user?.id);
    formdata.append("message", message);

    const res = await addMessage(formdata);

    if (res?.error) {
      Swal.fire({
        title: "Error!",
        text: res.error.data.message || "Failed to send message",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (res?.data) {
      setOpenModal(false);
      const chatId = res?.data?.data?.attributes?.chat;
      Swal.fire({
        title: "Message sent successfully",
        icon: "success",
        html: `<button id="viewMessageButton" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                 View Message
               </button>`,
        showConfirmButton: false,
        didRender: () => {
          document
            .getElementById("viewMessageButton")
            .addEventListener("click", () => {
              router.push(`/inbox/${chatId}`);
              Swal.close();
            });
        },
      });
    }

    e.target.message.value = "";
  };

  const handleOrder = async (item) => {
    if (!loginUserData) {
      toast.warning("You need to sign in to create an order.");
      router.push("/sign-in");
      return;
    } else if (loginUserData?.role === "freelancer") {
      toast.error("Only clients can place orders.");
      return;
    }
    const { gigTitle, price, deliveryDate } = item;
    const orderData = {
      items: [
        {
          name: gigTitle,
          price: price,
          quantity: 1,
        },
      ],
      freelancerId: user?.id,
      clientId: loginUserData?.id,
      gigId: gig?._id,
      deliveryDate: moment(new Date())
        .add(deliveryDate, "days")
        .format("YYYY-MM-DD"),
    };
    const res = await createOrder(orderData);
    if (res.error) {
      return;
    }
    if (res.data) {
      window.location = res?.data?.url;
    }
  };
  return (
    <>
      <div
        style={{
          boxShadow: "0px 0px 24px 0px #0000001A",
        }}
        className="p-3 md:p-5 rounded-lg"
      >
        <h1 className="text-2xl font-semibold border-b-2 border-gray-300 pb-3">
          About the seller
        </h1>

        {/* main card about */}
        <div>
          {/* profile */}
          <div className="flex items-center py-4  gap-3 ">
            <div className="">
              <Image
                src={`${imageBaseUrl}/${user?.image}`}
                width={500}
                height={300}
                className="w-[100px] h-[100px] rounded-full "
                alt="Profile Image"
              />
            </div>
            <div className="w-[70%]">
              <h1 className="text-lg font-bold">{user?.fullName}</h1>
              <p className="text-[14px]">{user?.intro}</p>
              <div className="flex gap-1">
                <IoStar className="text-primary" />
                <p className="text-[12px] text-primary">
                  {user?.review?.rating}
                </p>
                <p className="text-[12px]">({user?.review?.total || 0})</p>
              </div>
            </div>
          </div>

          {/* details info */}
          <div>
            <div className="flex justify-between   border-b-2 border-gray-300 pb-3">
              <div className="w-[50%]">
                <h1 className="text-textGray font-bold">Per Hour Rate</h1>
                <p className="text-lg font-medium">{user?.perHourRate || 0}</p>
              </div>
              <div className="w-[50%]">
                <h1 className="text-textGray font-bold">From</h1>
                <p className="text-lg font-medium">{user?.location}</p>
              </div>
            </div>
            <div className="flex justify-between   border-b-2 border-gray-300 pb-3">
              <div className="w-[50%]">
                <h1 className="text-textGray font-bold">Member since</h1>
                <p className="text-lg font-medium">
                  {user?.createdAt?.split("T")[0]}
                </p>
              </div>
              <div className="w-[50%]">
                <h1 className="text-textGray font-bold">Avg. response time</h1>
                <p className="text-lg font-medium">{user?.responseTime}</p>
              </div>
            </div>
            <div className="flex justify-between   border-b-2 border-gray-300 pb-3">
              <div className="w-[50%]">
                <h1 className="text-textGray font-bold">Languages</h1>
                <p className="text-lg font-medium">{user?.language}</p>
              </div>
              <div className="w-[50%]">
                <h1 className="text-textGray font-bold">Last delivery</h1>
                <p className="text-lg font-medium">1 day</p>
              </div>
            </div>
          </div>
          {/* description */}
          <p className="text-textGray py-3  border-b-2 border-gray-300 pb-3">
            {user?.about}
          </p>

          {/* contact */}
          <Modal
            centered
            open={openModal}
            footer={null}
            onCancel={() => setOpenModal(false)}
          >
            <form onSubmit={handleSubmit} className="py-5">
              <label className="text-xl font-semibold">
                Contact Freelancer
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full p-2 my-2 border border-gray-300 resize-none rounded outline-none"
                placeholder="Enter your message"
              />
              <button
                type="submit"
                className="w-full  btn-primary mt-[20px] hover:text-primary text-white bg-primary hover:bg-transparent transition-all flex text-center mx-auto items-center justify-center gap-2 border-primary border-2 rounded-lg px-5 py-2 md:py-2"
              >
                Submit
              </button>
            </form>
          </Modal>
          {loginUserData?.role == "freelancer" ? (
            ""
          ) : (
            <>
              <button
                onClick={showDrawer}
                className="w-full  btn-primary mt-[20px] hover:text-primary text-white bg-primary hover:bg-transparent transition-all flex text-center mx-auto items-center justify-center gap-2 border-primary border-2 rounded-lg px-5 py-2 md:py-2"
              >
                <span>Continue</span>
              </button>
              <button
                disabled={loginUserData?.role == "freelancer"}
                onClick={showModal}
                className="w-full  btn-primary mt-[20px] hover:text-primary text-white bg-primary hover:bg-transparent transition-all flex text-center mx-auto items-center justify-center gap-2 border-primary border-2 rounded-lg px-5 py-2 md:py-2"
              >
                <span>Contact me</span> <IoMdArrowForward />
              </button>
            </>
          )}
        </div>
      </div>

      <Drawer title={"Order Options"} onClose={onClose} open={open}>
        {Object.keys(feature).length > 0 ? (
          <div className="flex flex-col ">
            <div>
              <div>
                <div>
                  <div className="flex justify-between">
                    <h1 className="font-bold text-xl">{feature?.name}</h1>
                    <p className="text-lg font-bold">${feature?.price}</p>
                  </div>

                  <img src={`${imageBaseUrl}${feature?.image}`} />
                  <h1 className="font-bold text-xl">{feature?.gigTitle}</h1>
                </div>
                <div></div>
              </div>
              <h1 className="font-bold text-xl mt-2">Features</h1>
              <div>
                {feature?.features?.map((feature, index) => (
                  <ul key={index}>
                    <li className="text-sm font-medium mt-2 flex items-center gap-2">
                      <GoDotFill size={12} /> {feature?.feature}
                    </li>
                  </ul>
                ))}
                <p className="text-lg font-semibold mt-3">
                  {feature?.deliveryDate} day delivery
                </p>
              </div>
            </div>
            <div className="items-end">
              <button
                onClick={() => handleOrder(feature)}
                className="w-full  btn-primary mt-[20px] hover:text-primary text-white bg-primary hover:bg-transparent transition-all flex text-center mx-auto items-center justify-center gap-2 border-primary border-2 rounded-lg px-5 py-2 md:py-2"
              >
                <span>Continue ${feature?.price}</span>
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">No package Selected</p>
        )}
      </Drawer>
    </>
  );
};

export default AboutCard;
