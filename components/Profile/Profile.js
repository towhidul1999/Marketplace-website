"use client";
import dynamic from "next/dynamic";
import useUser from "@/hooks/useUser";

// Dynamically import FreelancerProfile and BuyerProfile components
const FreelancerProfile = dynamic(() => import("./Freelancer/FreelancerProfile"), { ssr: false });
const BuyerProfile = dynamic(() => import("./Buyer/BuyerProfile"), { ssr: false });

function Profile() {
  const user = useUser();
  return (
    <div>
      {user && user?.role === "freelancer" ? (
        <FreelancerProfile />
      ) : (
        <BuyerProfile />
      )}
    </div>
  );
}

export default Profile;
