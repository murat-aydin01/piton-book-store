"use client";
import { Heart, Menu, ShoppingCart, User, LucideIcon } from "lucide-react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useBooks } from "@/app/services/queries";
import { useRouter } from "next/navigation";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: number | undefined;
}

function Header() {
  const { favoriteBooks } = useBooks();
  const [isActive, setIsActive] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target as Node)
      ) {
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

  const handleNavigation = (href: string): void => {
    router.push(href);
    setIsActive(false);
  };

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

  return (
    <div className="flex items-center w-full h-auto mt-5 md:mt-0 md:h-30 relative">
      <div className="flex h-12 w-full justify-between gap-x-10">
        <Link href="/home" className="contents">
          <img src="/Logo.png" alt="logo" className="hidden sm:block" />
        </Link>
        <SearchBar />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-4 items-center">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="cursor-pointer relative"
                onClick={() => handleNavigation(item.href)}
              >
                <div className="bg-[#F4F4FF] p-2.5 rounded-sm flex items-center justify-center hover:bg-blue-100 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
            );
          })}
        </nav>
        
        {/* Mobile Menu Button */}
        <div ref={menuButtonRef} className="block md:hidden">
          <Menu
            onClick={() => setIsActive(!isActive)}
            className="h-full w-auto shrink-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <nav
        ref={menuRef}
        className={`absolute md:hidden z-10 flex flex-col justify-start items-start p-4 gap-y-4 right-0 left-0 top-full w-full bg-[#F4F4FF] border-2 border-[#090937]/10 rounded-sm shadow-2xl transition-all duration-300 ${
          isActive ? "block opacity-100" : "hidden opacity-0"
        }`}
      >
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index} 
              className="flex items-center gap-2 w-full cursor-pointer hover:text-blue-600 transition-colors relative"
              onClick={() => handleNavigation(item.href)}
            >
              <div className="bg-[#F4F4FF] p-2.5 rounded-sm flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
              <span>{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}

export default Header;