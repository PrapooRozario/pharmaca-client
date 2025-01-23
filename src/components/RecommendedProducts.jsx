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
    <div className="mb-20">
      <div className="mb-10">
        <h1 className="text-5xl font-semibold text-center">
          Recommend For You
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {products?.map((product) => (
          <div
            key={product?._id}
            className="flex items-center gap-4 bg-[#FEF5EC] w-full rounded-xl p-4"
          >
            <div className="w-1/4 shrink-0">
              <img src={product?.itemImage} alt={product?.itemName} className="object-cover" />
            </div>
            <div className="flex-1">
              <h1 className="md:text-2xl sm:text-xl font-medium mb-3">
                {product?.itemGenericName}
              </h1>
              <span className="md:text-3xl text-2xl font-semibold text-[#1E6BFF]">
                ${product?.perUnitPrice}
              </span>
              <p className="text-neutral-400 text-base mt-2">
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
