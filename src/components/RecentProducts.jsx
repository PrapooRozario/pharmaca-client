import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const RecentProducts = () => {
  const [axiosSecure] = useAxios();

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products`);
      return res.data.products;
    },
  });

  return (
    <div className="">
      <div className="mb-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center dark:text-white">
          Recent Products
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {products?.slice(0, 6)?.map((product) => (
          <div
            key={product?._id}
            className="flex items-center gap-4 bg-[#FEF5EC] dark:bg-neutral-900/50 w-full rounded-xl p-4 transition-colors duration-300"
          >
            <div className="w-1/4 shrink-0">
              <img
                src={product?.itemImage}
                alt={product?.itemName}
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h1 className="md:text-2xl sm:text-xl font-medium mb-3 dark:text-white">
                {product?.itemGenericName}
              </h1>
              <span className="md:text-3xl text-2xl font-semibold text-[#1E6BFF] dark:text-blue-400">
                ${product?.perUnitPrice}
              </span>
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

export default RecentProducts;
