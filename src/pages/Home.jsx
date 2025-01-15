import Category from "@/components/Category";
import DiscountProducts from "@/components/DiscountProducts";
import RecommendedProducts from "@/components/RecommendedProducts";
import Slider from "@/components/Slider";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <Category></Category>
      <DiscountProducts></DiscountProducts>
      <RecommendedProducts></RecommendedProducts>
    </div>
  );
};

export default Home;
