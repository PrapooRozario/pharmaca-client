import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Slide1 from "@/assets/Slide1.webp";
import { FreeMode } from "swiper/modules";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const DiscountProducts = () => {
  const [axiosPublic] = useAxios();
  const { data: products = [] } = useQuery({
    queryKey: ["DiscountedProducts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products/discounted");
      return res.data;
    },
  });
  return (
    <div className="container mx-auto px-4 mb-20">
      <div className="mb-10">
        <h1 className="text-5xl font-semibold text-center">
          Special Discounts
        </h1>
      </div>
      <div>
        <Swiper
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          freeMode={true}
          modules={[FreeMode]}
        >
          {products?.map((product) => (
            <SwiperSlide key={product?._id}>
              <div className="bg-white">
                <div className="relative">
                  <img
                    src={Slide1}
                    alt="Slide1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 ">
                  <p className="text-neutral-600 text-sm mb-2">
                    {product?.category}
                  </p>
                  <h1 className="text-xl font-medium mb-4">
                    {product?.itemName}
                  </h1>
                  <span className="text-2xl font-bold text-[#1E6BFF]">
                    $
                    {(
                      product?.perUnitPrice -
                      (product?.perUnitPrice * product?.discountPercentage) /
                        100
                    ).toFixed(2)}
                    <span className="text-neutral-400 text-base font-medium ml-2">
                      -{product?.discountPercentage}%
                    </span>
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DiscountProducts;
