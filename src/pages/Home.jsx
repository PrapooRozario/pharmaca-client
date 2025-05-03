import Category from "@/components/Category";
import DiscountProducts from "@/components/DiscountProducts";
import FAQ from "@/components/FAQ";
import RecentProducts from "@/components/RecentProducts";
import RecommendedProducts from "@/components/RecommendedProducts";
import Slider from "@/components/Slider";

const Home = () => {
  return (
    <div className="lg:space-y-32 md:space-y-24 sm:space-y-20 space-y-16">
      <Slider></Slider>
      <Category></Category>
      <RecentProducts></RecentProducts>
      <DiscountProducts></DiscountProducts>
      <RecommendedProducts></RecommendedProducts>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
