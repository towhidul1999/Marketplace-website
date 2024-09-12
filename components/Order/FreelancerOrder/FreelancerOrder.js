"use client";
import { useGetFreelancerAllOrderQuery } from "@/app/redux/features/order/freelancerOrderApi";
import { useState, useEffect } from "react";
import { Table } from "antd";
import Image from "next/image";
import Link from "next/link";
import { imageBaseUrl } from "@/lib/constant";

const FreelancerOrder = () => {
  const [activeTab, setActiveTab] = useState("Active");
  const [loading, setLoading] = useState(true);

  const { data: activeOrder } = useGetFreelancerAllOrderQuery("active");
  const { data: lateOrder } = useGetFreelancerAllOrderQuery("late");
  const { data: deliveredOrder } = useGetFreelancerAllOrderQuery("delivered");
  const { data: cancelledOrder } = useGetFreelancerAllOrderQuery("cancelled");

  useEffect(() => {
    if (activeOrder || lateOrder || deliveredOrder || cancelledOrder) {
      setLoading(false);
    }
  }, [activeOrder, lateOrder, deliveredOrder, cancelledOrder]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-cyan-800";
      case "Late":
        return "bg-rose-500";
      case "Delivered":
        return "bg-pink-500";
      case "Cancelled":
        return "bg-gray-500";
      default:
        return "black";
    }
  };

  const getActiveOrders = () => {
    switch (activeTab) {
      case "Active":
        return activeOrder;
      case "Late":
        return lateOrder;
      case "Delivered":
        return deliveredOrder;
      case "Cancelled":
        return cancelledOrder;
      default:
        return [];
    }
  };

  const freelancerTabsWithCounts = [
    { title: "Active", count: activeOrder?.results?.length || 0 },
    { title: "Late", count: lateOrder?.results?.length || 0 },
    { title: "Delivered", count: deliveredOrder?.results?.length || 0 },
    { title: "Cancelled", count: cancelledOrder?.results?.length || 0 },
  ];

  const columns = [
    {
      title: "Gig Image",
      dataIndex: "gigImage",
      key: "gigImage",
    },
    {
      title: "Gig Title",
      dataIndex: "gigTitle",
      key: "gigTitle",
      render: (text, record) => (
        <Link href={`/order/${record?.id}`}>{text}</Link>
      ),
    },
    {
      title: "Buyer",
      dataIndex: "buyer",
      key: "buyer",
    },
    {
      title: "Due On",
      dataIndex: "dueOn",
      key: "dueOn",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-3 py-1 rounded ${getStatusColor(status)} text-white`}
        >
          {status}
        </span>
      ),
    },
  ];

  const filteredOrders = getActiveOrders()?.results.map((order) => {
    return {
      key: order._id,
      id: order._id,
      gigImage: (
        <Image
          width={80}
          height={80}
          src={`${imageBaseUrl}${order?.gigId?.images[0]}`}
          alt="image"
          className="rounded"
        />
      ),
      gigTitle: order.gigId.title,
      buyer: order.clientId.fullName,
      dueOn: new Date(order.deliveryDate).toLocaleDateString(),
      total: `$${order.gigId.price}`,
      status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
    };
  });

  return (
    <div className="w-full container p-8">
      <h1 className="text-4xl font-light mb-4">Manage Orders</h1>
      <div className="flex flex-wrap gap-8 border-b border-gray-300 pt-5">
        {freelancerTabsWithCounts.map((tab) => (
          <button
            key={tab.title}
            onClick={() => setActiveTab(tab.title)}
            className={`relative pb-2 transition-colors text-sm duration-300 uppercase ${
              activeTab === tab.title ? "text-green-500" : "text-gray-500"
            }`}
          >
            {tab.title} ({tab.count})
            {activeTab === tab.title && (
              <span className="absolute bottom-[-1px] left-0 right-0 mx-auto w-full h-[2px] bg-green-500"></span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {loading ? (
          <p>Loading orders...</p>
        ) : filteredOrders?.length > 0 ? (
          <Table columns={columns} dataSource={filteredOrders} />
        ) : (
          <p>No {activeTab.toLowerCase()} orders to show.</p>
        )}
      </div>
    </div>
  );
};

export default FreelancerOrder;
