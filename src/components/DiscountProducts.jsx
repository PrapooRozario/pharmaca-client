import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
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
    <div className="container mx-auto py-10">
      <div className="mb-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center dark:text-white">
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
              <div className="bg-white dark:bg-neutral-900/50 rounded-xl overflow-hidden">
                <div className="relative">
                  <img
                    src={product?.itemImage}
                    alt={product?.itemName}
                    className="w-full h-44 object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-neutral-600 dark:text-gray-400 text-sm mb-2">
                    {product?.category?.charAt(0).toUpperCase() +
                      product?.category?.slice(1)}
                  </p>
                  <h1 className="text-xl font-medium mb-4 dark:text-white">
                    {product?.itemName}
                  </h1>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#1E6BFF] dark:text-blue-400">
                      $
                      {(
                        product?.perUnitPrice -
                        (product?.perUnitPrice * product?.discountPercentage) /
                          100
                      ).toFixed(2)}
                    </span>
                    <span className="text-neutral-400 dark:text-gray-500 text-base font-medium ml-2 line-through">
                      ${product?.perUnitPrice.toFixed(2)}
                    </span>
                  </div>
                  <span className="inline-block mt-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold rounded">
                    -{product?.discountPercentage}% OFF
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
