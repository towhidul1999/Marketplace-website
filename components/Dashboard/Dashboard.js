'use client'
import useUser from "@/hooks/useUser";
import FreelancerDashboard from "./FreelancerDashboard/FreelancerDashboard";
import BuyerDashboard from "./BuyerDashboard/BuyerDashboard";

const Dashboard = () => {
  const user = useUser();
  return (
    <>
      {user && user?.role === "freelancer" ? (
        <FreelancerDashboard />
      ) : (
        <BuyerDashboard />
      )}
    </>
  );
};

export default Dashboard;
