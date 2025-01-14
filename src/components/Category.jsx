import Prescription from "@/assets/Prescription.png";
import Medicines from "@/assets/Medicines.png";
import Wellness from "@/assets/Wellness.png";
import PersonalCare from "@/assets/Personal Care.png";
import MedicalDevices from "@/assets/Medical Devices.png";
import Herbal from "@/assets/Herbal.png";
const Category = () => {
  return (
    <div className="my-20 flex flex-wrap gap-6 justify-center">
      <div className="border p-8 rounded-3xl hover:border-[#1e6dff79] transition duration-200 cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
        <img src={Prescription} alt="Prescription" className="w-fit mx-auto" />
        <h1 className="text-center font-medium mt-4 text-xl">Prescription</h1>
      </div>
      <div className="border p-8 rounded-3xl hover:border-[#1e6dff79] transition duration-200 cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
        <img src={Medicines} alt="Medicines" className="w-fit mx-auto" />
        <h1 className="text-center font-medium mt-4 text-xl">Medicines</h1>
      </div>
      <div className="border p-8 rounded-3xl hover:border-[#1e6dff79] transition duration-200 cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
        <img src={Wellness} alt="Wellness" className="w-fit mx-auto" />
        <h1 className="text-center font-medium mt-4 text-xl">Wellness</h1>
      </div>
      <div className="border p-8 rounded-3xl hover:border-[#1e6dff79] transition duration-200 cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
        <img
          src={MedicalDevices}
          alt="Medical Devices"
          className="w-fit mx-auto"
        />
        <h1 className="text-center font-medium mt-4 text-xl">
          Medical Devices
        </h1>
      </div>
      <div className="border p-8 rounded-3xl hover:border-[#1e6dff79] transition duration-200 cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
        <img src={PersonalCare} alt="Personal Care" className="w-fit mx-auto" />
        <h1 className="text-center font-medium mt-4 text-xl">Personal Care</h1>
      </div>
      <div className="border p-8 rounded-3xl hover:border-[#1e6dff79] transition duration-200 cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
        <img src={Herbal} alt="Herbal" className="w-fit mx-auto" />
        <h1 className="text-center font-medium mt-4 text-xl">Herbal</h1>
      </div>
    </div>
  );
};

export default Category;
