import { NavLink } from "react-router";
import {
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="w-full bg-white p-8">
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
          <li>
            <NavLink className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500">
              Contribute
            </NavLink>
          </li>
          <li>
            <NavLink className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500">
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <div className="flex md:flex-row flex-col-reverse items-center justify-between">
        <NavLink color="blue-gray" className="text-center font-normal">
          &copy; {new Date().getFullYear()} Pharmaca
        </NavLink>
        <div className="flex items-center md:mb-0 mb-4 gap-4 *:text-neutral-600">
          <FaFacebook className="text-xl" />
          <FaLinkedinIn className="text-xl"></FaLinkedinIn>
          <FaTwitter className="text-xl"></FaTwitter>
          <FaGithub className="text-xl"></FaGithub>
          <FaDribbble className="text-xl"></FaDribbble>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
