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
    <footer className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">
          <NavLink to="/">
            <img
              src="/pharmaca.svg"
              alt="Pharmaca"
              className="w-44"
            />
          </NavLink>
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
            <li>
              <NavLink
                to="/"
                className="font-medium text-gray-700 dark:text-gray-300 transition-colors hover:text-blue-500 dark:hover:text-blue-400 focus:text-blue-500"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                className="font-medium text-gray-700 dark:text-gray-300 transition-colors hover:text-blue-500 dark:hover:text-blue-400 focus:text-blue-500"
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="font-medium text-gray-700 dark:text-gray-300 transition-colors hover:text-blue-500 dark:hover:text-blue-400 focus:text-blue-500"
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="font-medium text-gray-700 dark:text-gray-300 transition-colors hover:text-blue-500 dark:hover:text-blue-400 focus:text-blue-500"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            &copy; {new Date().getFullYear()} Pharmaca. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="https://www.facebook.com/pharmaca"
              target="_blank"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebook className="text-xl" />
            </Link>
            <Link
              to="https://www.instagram.com/pharmaca"
              target="_blank"
              className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="text-xl" />
            </Link>
            <Link
              to="https://twitter.com/pharmaca"
              target="_blank"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              aria-label="Twitter"
            >
              <FaXTwitter className="text-xl" />
            </Link>
            <Link
              to="https://www.linkedin.com/company/pharmaca"
              target="_blank"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="text-xl" />
            </Link>
            <Link
              to="https://github.com/pharmaca"
              target="_blank"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="text-xl" />
            </Link>
            <Link
              to="https://dribbble.com/pharmaca"
              target="_blank"
              className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
              aria-label="Dribbble"
            >
              <FaDribbble className="text-xl" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
