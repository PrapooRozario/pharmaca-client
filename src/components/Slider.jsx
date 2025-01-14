import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Slide from "@/shared/Slide";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
const Slider = () => {
  const colors = ["#1E6BFF", "#017066", "#2B4489", "#DF8A57"];
  return (
    <div className="flex items-center justify-center bg-gray-100 mt-10">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        className="w-full"
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
      >
        {colors.map((color, idx) => (
          <SwiperSlide key={idx}>
            <Slide color={color}></Slide>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
