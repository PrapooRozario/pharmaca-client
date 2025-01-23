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
import { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import useAuth from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Helmet } from "react-helmet";
const Navbar = () => {
  const { user, logout } = useAuth();
  const [language, setLanguage] = useState("Eng");
  return (
    <div>
      <Helmet>
        <title> Pharmaca | Home</title>
      </Helmet>

      <div className="flex items-center justify-between">
        {/* Brand Logo */}
        <div>
          <Link to="/">
            <img src="/pharmaca.svg" alt="pharmaca" />
          </Link>
        </div>
        {/* Navbar Mobile */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-0">
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px] p-4 md:hidden mr-14">
              {/* NavLinks */}
              <ul className="flex flex-col space-y-2 *:text-neutral-600 *:font-medium *:text-lg">
                <NavLink
                  to="/"
                  className="hover:text-black transition duration-150"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/shop"
                  className="hover:text-black transition duration-150"
                >
                  Shop
                </NavLink>
                <div className="flex flex-col pt-4 gap-8">
                  <Link to="/products/cart">
                    <ShoppingBag className="text-neutral-600 w-6 cursor-pointer" />
                  </Link>
                  <DropdownMenu>
                    {/* Language Toggle */}
                    <DropdownMenuTrigger className="outline-0 cursor-pointer">
                      {language === "Eng" ? (
                        <div className="flex items-center w-[50px] gap-1.5">
                          <img src={UsFlag} alt="United States" />
                          <p className="text-sm font-medium">Eng</p>
                        </div>
                      ) : (
                        <div className="flex items-center w-[50px] gap-1.5">
                          <img src={BdFlag} alt="Bangladesh" />
                          <p className="text-sm font-medium">Bng</p>
                        </div>
                      )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="md:hidden">
                      <DropdownMenuItem>
                        <div
                          className="flex items-center gap-1.5"
                          onClick={() => setLanguage("Eng")}
                        >
                          <img src={UsFlag} alt="United States" />
                          <p className="text-sm font-medium">Eng</p>
                          {language === "Eng" && <Dot></Dot>}
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div
                          className="flex items-center gap-1.5"
                          onClick={() => setLanguage("Bng")}
                        >
                          <img src={BdFlag} alt="Bangladesh" />
                          <p className="text-sm font-medium">Bng</p>
                          {language === "Bng" && <Dot></Dot>}
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* Button */}
                  {user && user?.email ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                          <AvatarImage src={user?.photoURL} alt="@shadcn" />
                          <AvatarFallback>
                            {user?.displayName?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 md:hidden p-4">
                        <ul className="flex flex-col space-y-3">
                          <NavLink className="font-medium hover:text-black text-neutral-600 transition duration-200">
                            Update Profile
                          </NavLink>
                          <NavLink
                            to={"/dashboard"}
                            className="font-medium hover:text-black text-neutral-600 transition duration-200"
                          >
                            Dashboard
                          </NavLink>
                          <Button
                            onClick={logout}
                            className={`${buttonVariants({
                              variant: "primary",
                            })} w-fit px-6`}
                          >
                            Logout
                          </Button>
                        </ul>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link to="/auth/signup">
                      <Button
                        className={buttonVariants({ variant: "primary" })}
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
        <ul className="md:flex items-center gap-8 *:text-neutral-600 *:font-medium *:text-lg hidden">
          <NavLink to="/" className="hover:text-black transition duration-150">
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className="hover:text-black transition duration-150"
          >
            Shop
          </NavLink>
        </ul>
        <div className="md:flex items-center gap-8 hidden">
          <Link to="/products/cart">
            <ShoppingBag className="text-neutral-600 w-6 cursor-pointer" />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-0 cursor-pointer">
              {language === "Eng" ? (
                <div className="flex items-center w-[50px] gap-1.5">
                  <img src={UsFlag} alt="United States" />
                  <p className="text-sm font-medium">Eng</p>
                </div>
              ) : (
                <div className="flex items-center w-[50px] gap-1.5">
                  <img src={BdFlag} alt="Bangladesh" />
                  <p className="text-sm font-medium">Bng</p>
                </div>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <div
                  className="flex items-center gap-1.5"
                  onClick={() => setLanguage("Eng")}
                >
                  <img src={UsFlag} alt="United States" />
                  <p className="text-sm font-medium">Eng</p>
                  {language === "Eng" && <Dot></Dot>}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div
                  className="flex items-center gap-1.5"
                  onClick={() => setLanguage("Bng")}
                >
                  <img src={BdFlag} alt="Bangladesh" />
                  <p className="text-sm font-medium">Bng</p>
                  {language === "Bng" && <Dot></Dot>}
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* {Button} */}
          {user && user?.email ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.photoURL} alt="@shadcn" />
                  <AvatarFallback>
                    {user?.displayName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 hidden md:block p-4">
                <ul className="flex flex-col space-y-3">
                  <NavLink className="font-medium hover:text-black text-neutral-600 transition duration-200">
                    Update Profile
                  </NavLink>
                  <NavLink
                    to={"/dashboard"}
                    className="font-medium hover:text-black text-neutral-600 transition duration-200"
                  >
                    Dashboard
                  </NavLink>
                  <Button
                    onClick={logout}
                    className={`${buttonVariants({
                      variant: "primary",
                    })} w-fit px-6`}
                  >
                    Logout
                  </Button>
                </ul>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth/signup">
              <Button className={buttonVariants({ variant: "primary" })}>
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
