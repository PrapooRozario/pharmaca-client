import PropTypes from 'prop-types';

const Slide = ({ image, title, description, color }) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className="flex flex-col-reverse h-[520px] md:h-[420px] md:flex-row gap-6 sm:flex-row justify-center items-center md:px-16 px-6 md:py-0 py-6 rounded-xl"
    >
      <div className="text-center md:text-left sm:text-left">
        <h1 className="lg:text-5xl md:text-4xl sm:text-4xl text-2xl text-white font-medium">
          {title}
        </h1>
        <p className="text-white/80 md:text-lg md:mt-4 mt-2">{description}</p>
      </div>
      <img src={image} alt={title} className="md:w-2/4 md:h-[400px] sm:w-2/4" />
    </div>
  );
};

Slide.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};
export default Slide;
