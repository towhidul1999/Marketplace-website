import PrimaryLayout from "@/components/Layout/PrimaryLayout";
import OrderDetails from "@/components/Order/OrderDetails/OrderDetails";
import React from "react";

const page = ({ params }) => {
  const { orderId } = params;
  return (
    <PrimaryLayout>
      <OrderDetails orderId={orderId} />
    </PrimaryLayout>
  );
};

export default page;
