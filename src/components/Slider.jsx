import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Slide from "@/shared/Slide";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
const Slider = () => {
  const colors = ["#1E6BFF", "#017066", "#2B4489", "#DF8A57"];
  const [axiosSecure] = useAxios();
  const { data: banners = [] } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/banners`);
      return res.data;
    },
  });
  console.log(banners)
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
        {banners.map((banner, idx) => (
          <SwiperSlide key={idx}>
            <Slide
              color={colors[idx % colors.length]}
              image={banner?.bannerImage}
              title={banner?.bannerName}
              description={banner?.description}
            ></Slide>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
