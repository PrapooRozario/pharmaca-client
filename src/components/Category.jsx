import Prescription from "@/assets/Prescription.png";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
const Category = () => {
  const [axiosPublic] = useAxios();
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products/categories");
      return res.data;
    },
  });
  return (
    <div className="my-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
      {categories?.map((Category) => (
        <NavLink
          key={Category?._id}
          to={`/category/${Category?.category}`}
          className="border p-8 rounded-3xl w-auto hover:border-[#1e6dff79] transition duration-200 cursor-pointer"
        >
          <div>
            <img
              src={Prescription}
              alt="Prescription"
              className="w-auto h-auto mx-auto"
            />
          </div>
          <h1 className="text-center font-medium mt-4 text-base sm:text-xl md:text-lg lg:text-xl xl:text-lg 2xl:text-xl break-words">
            {Category?.category}
          </h1>
        </NavLink>
      ))}
    </div>
  );
};

export default Category;
