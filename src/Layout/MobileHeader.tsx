"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    AiOutlineHeart,
    AiOutlineShoppingCart,
    AiOutlineUser,
} from "react-icons/ai";

import logo from "@/public/logo.png";
import Image from "next/image";
import { IoMenu } from "react-icons/io5";
const MobileNavBar = () => {
  return (
    <div className="w-full sm:hidden h-auto px-5 py-2 sticky top-0 z-50 bg-[#FEFDFC]">
      <Sheet>
        <ul className=" flex justify-between items-center">
          <div className=" flex gap-2 items-center">
            <a href={"/"}>
              <Image src={logo} alt="Logo" width={100} />
            </a>
          </div>
          <div className=" flex gap-2 items-center">
            <div className="flex items-center gap-3 text-gray-600 align-baseline">
              <div className="relative cursor-pointer hover:text-green-500">
                <AiOutlineUser size={24} />
                <span
                  className="absolute -top-2 -right-2 text-green-500 text-xs px-1"
                  style={{ backgroundColor: "#00B412" }}
                ></span>
              </div>
              <div className="relative cursor-pointer hover:text-green-500">
                <AiOutlineHeart size={24} />
                <span
                  className="absolute -top-2 -right-2 text-white text-xs px-1"
                  style={{ backgroundColor: "#00B412" }}
                >
                  0
                </span>
              </div>
              <div className="relative cursor-pointer hover:text-green-500">
                <AiOutlineShoppingCart size={24} />
                <span
                  className="absolute -top-2 -right-2 text-white text-xs px-1"
                  style={{ backgroundColor: "#00B412" }}
                >
                  0
                </span>
              </div>
              <SheetTrigger>
                <IoMenu size={24} />
              </SheetTrigger>
            </div>
          </div>
        </ul>

        <SheetContent side={"left"} className=" ">
          <SheetHeader>
            <SheetTitle className=" flex justify-center">
              <a href={"/"}>
                <Image src={logo} alt="Logo" width={100} />
              </a>
            </SheetTitle>
            <ul className=" text-center flex flex-col py-10 items-center uppercase">
              <a href={"/"} className="w-full h-auto p-2">
                Home
              </a>
              <a href={"/about"} className="w-full h-auto p-2">
                About us
              </a>
              <a href={"/blogs"} className="w-full h-auto p-2">
                Blog
              </a>
              <a href={"/project"} className="w-full h-auto p-2">
                Projects
              </a>
              <a href={"/contact"} className="w-full h-auto p-2">
                Contact
              </a>
              {/* <Button className=" rounded-full w-fit">Book A Call</Button> */}
            </ul>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavBar;
