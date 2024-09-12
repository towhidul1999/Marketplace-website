import React from "react";
import OrderLeftSide from "./OrderLeftSide/OrderLeftSide";
import OrderRightSide from "./OrderRightSide/OrderRightSide";

const OrderDetails = ({orderId}) => {
  return (
    <div className="w-full container grid grid-cols-1 md:grid-cols-12 gap-14 py-8">
      <OrderLeftSide orderId={orderId} />
      <OrderRightSide orderId={orderId} />
    </div>
  );
};

export default OrderDetails;
