import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-2 h-full">
      <div className=" relative">
        <Image src="/SidePicture.png" alt="side image" fill className="object-cover"  />
      </div>
      <div className="flex flex-col justify-center items-center h-screen">{children}</div>
    </div>
  );
}
