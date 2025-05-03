import { ArrowRight, Dot, Menu, ShoppingBag } from "lucide-react";
import { Link, NavLink } from "react-router";
import UsFlag from "@/assets/US_FLAG.svg";
import BdFlag from "@/assets/BD_FLAG.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import useAuth from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Helmet } from "react-helmet";
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [language, setLanguage] = useState("Eng");
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-[#0A0A0A] py-4">
      <Helmet>
        <title> Pharmaca | Home</title>
      </Helmet>

      <div className="flex items-center justify-between">
        {/* Brand Logo */}
        <div>
          <Link to="/">
            <img src="/pharmaca.svg" alt="pharmaca"/>
          </Link>
        </div>

        {/* Navbar Mobile */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-0">
              <Menu className="text-gray-900 dark:text-gray-100" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px] p-4 md:hidden mr-14 bg-white dark:bg-gray-800 border dark:border-gray-700">
              {/* NavLinks */}
              <ul className="flex flex-col space-y-2 *:text-neutral-600 *:dark:text-gray-300 *:font-medium *:text-lg">
                <NavLink
                  to="/"
                  className="hover:text-black dark:hover:text-white transition duration-150"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/shop"
                  className="hover:text-black dark:hover:text-white transition duration-150"
                >
                  Shop
                </NavLink>

                <div className="flex flex-col pt-4 gap-8">
                  <Link to="/products/cart">
                    <ShoppingBag className="text-neutral-600 dark:text-gray-300 w-6 cursor-pointer" />
                  </Link>
                  <button onClick={toggleTheme}>
                    {isDark ? (
                      <MdOutlineNightlight className="text-neutral-600 dark:text-gray-300 text-2xl cursor-pointer" />
                    ) : (
                      <MdOutlineLightMode className="text-neutral-600 dark:text-gray-300 text-2xl cursor-pointer" />
                    )}
                  </button>
                  <DropdownMenu>
                    {/* Language Toggle */}
                    <DropdownMenuTrigger className="outline-0 cursor-pointer">
                      {language === "Eng" ? (
                        <div className="flex items-center w-[50px] gap-1.5">
                          <img src={UsFlag} alt="United States" />
                          <p className="text-sm font-medium dark:text-gray-300">
                            Eng
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center w-[50px] gap-1.5">
                          <img src={BdFlag} alt="Bangladesh" />
                          <p className="text-sm font-medium dark:text-gray-300">
                            Bng
                          </p>
                        </div>
                      )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="md:hidden bg-white dark:bg-gray-800 border dark:border-gray-700">
                      <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div
                          className="flex items-center gap-1.5"
                          onClick={() => setLanguage("Eng")}
                        >
                          <img src={UsFlag} alt="United States" />
                          <p className="text-sm font-medium dark:text-gray-300">
                            Eng
                          </p>
                          {language === "Eng" && (
                            <Dot className="dark:text-gray-300" />
                          )}
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div
                          className="flex items-center gap-1.5"
                          onClick={() => setLanguage("Bng")}
                        >
                          <img src={BdFlag} alt="Bangladesh" />
                          <p className="text-sm font-medium dark:text-gray-300">
                            Bng
                          </p>
                          {language === "Bng" && (
                            <Dot className="dark:text-gray-300" />
                          )}
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* Button */}
                  {user && user?.email ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                          <AvatarImage
                            src={user?.photoURL}
                            alt={user?.displayName}
                          />
                          <AvatarFallback className="dark:bg-gray-700 dark:text-white">
                            {user?.displayName?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 md:hidden p-4 bg-white dark:bg-gray-800 border dark:border-gray-700">
                        <ul className="flex flex-col space-y-3">
                          <NavLink
                            to="/profile/me"
                            className="font-medium hover:text-black dark:hover:text-white text-neutral-600 dark:text-gray-300 transition duration-200"
                          >
                            Update Profile
                          </NavLink>
                          <NavLink
                            to={"/dashboard"}
                            className="font-medium hover:text-black dark:hover:text-white text-neutral-600 dark:text-gray-300 transition duration-200"
                          >
                            Dashboard
                          </NavLink>
                          <Button
                            onClick={logout}
                            className={`${buttonVariants({
                              variant: "primary",
                            })} w-fit px-6 dark:bg-primary-600 dark:hover:bg-primary-700`}
                          >
                            Logout
                          </Button>
                        </ul>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link to="/auth/signup">
                      <Button
                        className={`${buttonVariants({
                          variant: "primary",
                        })} dark:bg-primary-600 dark:hover:bg-primary-700`}
                      >
                        Join Us <ArrowRight className="w-5" />
                      </Button>
                    </Link>
                  )}
                </div>
              </ul>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navbar Tablet/Pc */}
        <div className="md:flex items-center gap-8 hidden">
          <ul className="md:flex items-center gap-8 *:text-neutral-600 *:dark:text-gray-300 *:font-medium *:text-lg hidden">
            <NavLink
              to="/"
              className="hover:text-black dark:hover:text-white transition duration-150"
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className="hover:text-black dark:hover:text-white transition duration-150"
            >
              Shop
            </NavLink>
          </ul>
          <Link to="/products/cart">
            <ShoppingBag className="text-neutral-600 dark:text-gray-300 w-6 cursor-pointer" />
          </Link>
          <button onClick={toggleTheme}>
            {isDark ? (
              <MdOutlineNightlight className="text-neutral-600 dark:text-gray-300 text-2xl cursor-pointer" />
            ) : (
              <MdOutlineLightMode className="text-neutral-600 dark:text-gray-300 text-2xl cursor-pointer" />
            )}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-0 cursor-pointer">
              {language === "Eng" ? (
                <div className="flex items-center w-[50px] gap-1.5">
                  <img src={UsFlag} alt="United States" />
                  <p className="text-sm font-medium dark:text-gray-300">Eng</p>
                </div>
              ) : (
                <div className="flex items-center w-[50px] gap-1.5">
                  <img src={BdFlag} alt="Bangladesh" />
                  <p className="text-sm font-medium dark:text-gray-300">Bng</p>
                </div>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-gray-800 border dark:border-gray-700">
              <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <div
                  className="flex items-center gap-1.5"
                  onClick={() => setLanguage("Eng")}
                >
                  <img src={UsFlag} alt="United States" />
                  <p className="text-sm font-medium dark:text-gray-300">Eng</p>
                  {language === "Eng" && <Dot className="dark:text-gray-300" />}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <div
                  className="flex items-center gap-1.5"
                  onClick={() => setLanguage("Bng")}
                >
                  <img src={BdFlag} alt="Bangladesh" />
                  <p className="text-sm font-medium dark:text-gray-300">Bng</p>
                  {language === "Bng" && <Dot className="dark:text-gray-300" />}
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {user && user?.email ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.photoURL} alt="@shadcn" />
                  <AvatarFallback className="dark:bg-gray-700 dark:text-white">
                    {user?.displayName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 hidden md:block p-4 bg-white dark:bg-gray-800 border dark:border-gray-700">
                <ul className="flex flex-col space-y-3">
                  <NavLink
                    to="/profile/me"
                    className="font-medium hover:text-black dark:hover:text-white text-neutral-600 dark:text-gray-300 transition duration-200"
                  >
                    Update Profile
                  </NavLink>
                  <NavLink
                    to={"/dashboard"}
                    className="font-medium hover:text-black dark:hover:text-white text-neutral-600 dark:text-gray-300 transition duration-200"
                  >
                    Dashboard
                  </NavLink>
                  <Button
                    onClick={logout}
                    className={`${buttonVariants({
                      variant: "primary",
                    })} w-fit px-6 dark:bg-primary-600 dark:hover:bg-primary-700`}
                  >
                    Logout
                  </Button>
                </ul>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth/signup">
              <Button
                className={`${buttonVariants({
                  variant: "primary",
                })} dark:bg-primary-600 dark:hover:bg-primary-700`}
              >
                Join Us <ArrowRight className="w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
