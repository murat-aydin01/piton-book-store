"use client";
import { Heart, LucideIcon, Menu, ShoppingCart, User } from "lucide-react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useBooks } from "@/app/services/queries";
import { useRouter } from "next/navigation";

type NavItem = {
    icon: LucideIcon;
    label: string;
    href: string;
    badge?: number
  }
  
function Header() {
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const {favoriteBooks} = useBooks()
  const router = useRouter()

  const navItems: NavItem[] = [
    { icon: User, label: "Profile", href: "/profile" },
    { 
      icon: Heart, 
      label: "Favorites", 
      href: "/favorites", 
      badge: favoriteBooks?.length && favoriteBooks.length > 0 ? favoriteBooks.length : undefined
    },
    { icon: ShoppingCart, label: "Cart", href: "/cart" }
  ];

  const handleRoute = (href:string) => {
    router.push(href)
    setIsActive(false)
  }

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
          {navItems.map((item, index)=>{
            const Icon = item.icon
            return <div key={index} onClick={()=>{handleRoute(item.href)}} className="relative bg-[#F4F4FF] h-full w-auto p-2.5 rounded-sm hover:cursor-pointer">
              <Icon/>
              {item.badge && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center">
                {item.badge > 9 ? "9+" : item.badge}
              </span>}
            </div>
          })}
        </nav>
        <div ref={menuButtonRef} className="block md:hidden">
          <Menu  onClick={()=>{setIsActive(!isActive)}} className=" h-full w-auto shrink-0" />
        </div>
      </div>


      <nav ref={menuRef} className={`absolute md:hidden z-10 flex flex-col justify-start items-start px-2.5 gap-y-1 right-0 left-0 top-full w-full bg-[#F4F4FF] border-2 border-[#090937]/10 rounded-sm shadow-2xl transition-all transition-discrete duration-500 ${isActive ? "block opacity-100" : "hidden opacity-0"}`}>
        {navItems.map((item, index)=>{
          const Icon = item.icon;
          return <div key={index} onClick={()=>{handleRoute(item.href)}} className="flex items-center w-full hover:cursor-pointer hover:border">
            <Icon className="bg-[#F4F4FF] h-full w-auto p-2.5 rounded-sm"/>
            <p>{item.label}</p>
            {item.badge && <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{item.badge > 9 ? "9+" : item.badge}</span>}
          </div>
        })}
      </nav>
    </div>
  );
}

export default Header;