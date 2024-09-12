'use client';
import PrimaryLayout from "@/components/Layout/PrimaryLayout";
import HeroSection from "@/components/Home/HeroSection/HeroSection";
import JoinCNNCTR from "@/components/Home/JoinCNNCTR/JoinCNNCTR";
import MostPopularCategories from "@/components/Home/MostPopularCategories/MostPopularCategories";
import MostPopularFreelancers from "@/components/Home/MostPopularFreelancers/MostPopularFreelancers";
import Testimonials from "@/components/Home/Testimonials/Testimonials";
import TheLatestNewsAndBlog from "@/components/Home/TheLatestNewsAndBlog/TheLatestNewsAndBlog";
import TrendingOffers from "@/components/Home/TrendingOffers/TrendingOffers";
import WhyChooseUs from "@/components/Home/WhyChooseUs/WhyChooseUs";
const Home = () => {
  return (
    <>
      <PrimaryLayout>
        <main className="">
          <HeroSection />
          <MostPopularCategories />
          <MostPopularFreelancers />
          {/* <TrendingOffers /> */}
          <WhyChooseUs />
          <Testimonials />
          <JoinCNNCTR />
          <TheLatestNewsAndBlog />
        </main>
      </PrimaryLayout>
    </>
  );
};

export default Home;
