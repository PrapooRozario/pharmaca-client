import { Link, NavLink } from "react-router";
import {
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="w-full bg-white py-10">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
        <img src="/pharmaca.svg" alt="Pharmaca" className="w-44" />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <NavLink
              to="/"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Shop
            </NavLink>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <div className="flex md:flex-row flex-col-reverse items-center justify-between">
        <NavLink to="/" color="blue-gray" className="text-center font-normal">
          &copy; {new Date().getFullYear()} Pharmaca
        </NavLink>
        <div className="flex items-center md:mb-0 mb-4 gap-4 *:text-neutral-600">
          <Link to="https://www.facebook.com/pharmaca" target="_blank">
            <FaFacebook className="text-xl" />
          </Link>
          <Link to="https://www.instagram.com/pharmaca" target="_blank">
            <FaInstagram className="text-xl" />
          </Link>
          <Link to="https://twitter.com/pharmaca" target="_blank">
            <FaXTwitter className="text-xl" />
          </Link>
          <Link to="https://www.linkedin.com/company/pharmaca" target="_blank">
            <FaLinkedinIn className="text-xl" />
          </Link>
          <Link to="https://github.com/pharmaca" target="_blank">
            <FaGithub className="text-xl" />
          </Link>
          <Link to="https://dribbble.com/pharmaca" target="_blank">
            <FaDribbble className="text-xl" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
