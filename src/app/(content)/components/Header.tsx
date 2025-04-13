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
    <div className="flex items-center w-full h-30 relative">
      <div className="flex h-12 w-full justify-between gap-x-10">
        <img src="/Logo.png" alt="logo" className="hidden sm:block" />
        <SearchBar />
        <nav className="hidden md:flex md:gap-x-4">
          <User className="bg-[#F4F4FF] h-full w-auto p-2.5 rounded-sm " />
          <Heart className="bg-[#F4F4FF] h-full w-auto p-2.5 rounded-sm" />
          <ShoppingCart className="bg-[#F4F4FF] h-full w-auto p-2.5 rounded-sm" />
        </nav>
        <div ref={menuButtonRef}>
          <Menu  onClick={()=>{setIsActive(!isActive)}} className="block md:hidden h-full w-auto shrink-0" />
        </div>
      </div>


      <nav ref={menuRef} className={`absolute flex flex-col justify-start items-start px-2.5 gap-y-1 right-0 left-0 top-full w-full bg-[#F4F4FF] border-2 border-[#090937]/10 rounded-sm shadow-2xl  ${isActive ? "block" : "hidden"}`}>
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
