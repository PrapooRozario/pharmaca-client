import Category from "@/components/Category";
import DiscountProducts from "@/components/DiscountProducts";
import FAQ from "@/components/FAQ";
import RecentProducts from "@/components/RecentProducts";
import RecommendedProducts from "@/components/RecommendedProducts";
import Slider from "@/components/Slider";

const Home = () => {
  return (
    <div>
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
