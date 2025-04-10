"use client"
import { Heart, ShoppingCart, User } from "lucide-react";
import SearchBar from "./SearchBar";

function Header() {
  

  return (
    <div className="flex items-center w-full h-30">
      <div className="flex h-12 w-full justify-between gap-x-10">
        <img src="/Logo.png" alt="logo" className="" />
        <SearchBar/>
        <div className="flex gap-x-4">
          <User className="bg-[#F4F4FF] h-full w-auto p-2.5 rounded-sm " />
          <Heart className="bg-[#F4F4FF] h-full w-auto p-2.5 rounded-sm" />
          <ShoppingCart className="bg-[#F4F4FF] h-full w-auto p-2.5 rounded-sm" />
        </div>
      </div>
    </div>
  );
}

export default Header;
