"use client";
import { Heart, Menu, ShoppingCart, User } from "lucide-react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function Header() {
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };
    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isActive]);

  return (
    <div className="flex items-center w-full h-auto mt-5 md:mt-0 md:h-30 relative">
      <div className="flex h-12 w-full justify-between gap-x-10">
        <Link href={"/home"} className="contents"><img src="/Logo.png" alt="logo" className="hidden sm:block" /></Link>
        <SearchBar />
        <nav className="hidden md:flex md:gap-x-4">
          <User className="bg-[#F4F4FF] h-full w-auto p-2.5 rounded-sm " />
          <Heart className="bg-[#F4F4FF] h-full w-auto p-2.5 rounded-sm" />
          <ShoppingCart className="bg-[#F4F4FF] h-full w-auto p-2.5 rounded-sm" />
        </nav>
        <div ref={menuButtonRef} className="block md:hidden">
          <Menu  onClick={()=>{setIsActive(!isActive)}} className=" h-full w-auto shrink-0" />
        </div>
      </div>


      <nav ref={menuRef} className={`absolute md:hidden z-10 flex flex-col justify-start items-start px-2.5 gap-y-1 right-0 left-0 top-full w-full bg-[#F4F4FF] border-2 border-[#090937]/10 rounded-sm shadow-2xl transition-all transition-discrete duration-500 ${isActive ? "block opacity-100" : "hidden opacity-0"}`}>
        <div className="flex items-center">
          <User className="bg-[#F4F4FF] h-full w-auto p-2.5 rounded-sm " />
          <Link href={"/"}>Profile</Link>
        </div>
        <div className="flex items-center">
          <Heart className="bg-[#F4F4FF] h-full w-auto p-2.5 rounded-sm" />
          <Link href={"/"}>Favorites</Link>
        </div>
        <div className="flex items-center">
          <ShoppingCart className="bg-[#F4F4FF] h-full w-auto p-2.5 rounded-sm" />
          <Link href={"/"}>Cart</Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
