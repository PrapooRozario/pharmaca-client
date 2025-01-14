import Slide1 from "@/assets/Slide1.webp";
const Slide = ({ image, title, description, color }) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className="flex flex-col-reverse md:flex-row sm:flex-row justify-center items-center md:px-16 px-6 md:py-0 py-6 rounded-xl"
    >
      <div className="text-center md:text-left sm:text-left">
        <h1 className="lg:text-6xl md:text-4xl sm:text-4xl text-2xl text-white font-medium">
          Pill Bottle Mockup
        </h1>
        <p className="text-white/80 md:text-xl md:mt-4 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam,
          maiores?
        </p>
      </div>
      <img src={Slide1} alt="Slide1" className="md:w-2/4 sm:w-2/4 w-full" />
    </div>
  );
};

export default Slide;
