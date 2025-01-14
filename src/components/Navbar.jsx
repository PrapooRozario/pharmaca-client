import { ArrowRight, Dot, Menu, ShoppingBag } from "lucide-react";
import { NavLink } from "react-router";
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
const Navbar = () => {
  const [language, setLanguage] = useState("Eng");
  console.log(language);
  return (
    <div>
      <div className="flex items-center justify-between">
        {/* Brand Logo */}
        <div>
          <img src="/public/pharmaca.svg" alt="pharmaca" />
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
                <NavLink className="hover:text-black transition duration-150">
                  Home
                </NavLink>
                <NavLink className="hover:text-black transition duration-150">
                  Shop
                </NavLink>
                <div className="flex flex-col pt-4 gap-8">
                  <ShoppingBag className="text-neutral-600 w-6 cursor-pointer" />
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
                  <Button className={buttonVariants({ variant: "primary" })}>
                    Join Us <ArrowRight className="w-5" />
                  </Button>
                </div>
              </ul>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Navbar Tablet/Pc */}
        <ul className="md:flex items-center gap-8 *:text-neutral-600 *:font-medium *:text-lg hidden">
          <NavLink className="hover:text-black transition duration-150">
            Home
          </NavLink>
          <NavLink className="hover:text-black transition duration-150">
            Shop
          </NavLink>
        </ul>
        <div className="md:flex items-center gap-8 hidden">
          <ShoppingBag className="text-neutral-600 w-6 cursor-pointer" />
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
          <Button className={buttonVariants({ variant: "primary" })}>
            Join Us <ArrowRight className="w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
