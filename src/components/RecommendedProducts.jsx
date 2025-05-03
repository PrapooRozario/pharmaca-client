import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const RecommendedProducts = () => {
  const [axiosSecure] = useAxios();
  const { data: products = [] } = useQuery({
    queryKey: ["RecommendedProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/recommended");
      return res.data;
    },
  });

  return (
    <div className="py-12">
      <div className="mb-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center dark:text-white">
          Recommended For You
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 sm:px-6 lg:px-8">
        {products?.map((product) => (
          <div
            key={product?._id}
            className="flex items-center gap-4 bg-[#FEF5EC] dark:bg-neutral-900/50 w-full rounded-xl p-4"
          >
            <div className="w-1/4 shrink-0">
              <img
                src={product?.itemImage}
                alt={product?.itemName}
                className="object-cover rounded-lg w-full h-24 sm:h-32"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h1 className="md:text-2xl sm:text-xl font-medium mb-3 dark:text-white line-clamp-2">
                  {product?.itemGenericName}
                </h1>
                {product?.discountPercentage > 0 && (
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold px-2 py-1 rounded">
                    -{product?.discountPercentage}%
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="md:text-3xl text-2xl font-semibold text-[#1E6BFF] dark:text-blue-400">
                  ${product?.perUnitPrice}
                </span>
              </div>
              <p className="text-neutral-400 dark:text-gray-400 text-base mt-2">
                {product?.itemMassUnit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
