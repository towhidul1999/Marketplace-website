"use client";
import React, { useState } from "react";
import Activity from "./Activity";

const tabs = [
  { title: "Activity", content: <Activity /> },
  { title: "Details", content: "This is the Details tab content." },
  { title: "Requirements", content: "This is the Requirements tab content." },
];

const OrderLeftSide = ({orderId}) => {
  const [activeTab, setActiveTab] = useState("Activity");

  return (
    <div className="w-full col-span-9">
      <Activity orderId={orderId}/>
    </div>
  );
};

export default OrderLeftSide;
