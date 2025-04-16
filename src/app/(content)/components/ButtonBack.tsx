"use client"
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function ButtonBack({label}:{label:string}) {
    const router = useRouter()
  return (
    <div className="flex items-center justify-between lg:justify-start">
      <ChevronLeft onClick={() => {router.back()}} className="hover:scale-125 duration-150"/>
      <p className="text-[#090937] text-2xl font-bold">{label}</p>
    </div>
  );
}

export default ButtonBack;
