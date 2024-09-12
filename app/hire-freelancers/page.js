import dynamic from "next/dynamic";
import PrimaryLayout from "@/components/Layout/PrimaryLayout";
const Freelancers = dynamic(
  () => import("@/components/Freelancers/Freelancers"),
  { ssr: false }
);

const Page = () => {
  return (
    <PrimaryLayout>
      <Freelancers />
    </PrimaryLayout>
  );
};

export default Page;
