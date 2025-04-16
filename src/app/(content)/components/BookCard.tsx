"use client"
import React from "react";
import { useCoverImage } from "../../services/queries";
import Link from "next/link";
import Loading from "@/app/(auth)/components/Loading";
import { Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { likeFetcher } from "@/app/services/api";
import { getTokenId } from "@/app/(auth)/utils/authLocalStorage";

type Props = {
  id: string;
  cover: string;
  name: string;
  author: string;
  price: string;
  variant: "raw" | "grid";
  mutate?: () => void
};

function BookCard({ id, cover, name, author, price, variant, mutate }: Props) {
  const { coverUrl, isLoading } = useCoverImage(cover);
  const {trigger} = useSWRMutation("/unlike", likeFetcher)
  const pathname = usePathname()
  const user_id = getTokenId()

  if (isLoading) return <Loading/>;
  return (
    <Link href={`/books/${id}`} className="contents">
      <div
        className={`relative grid h-full justify-center gap-0 bg-[#F4F4FF] border border-[#090937]/10 rounded-sm
        ${
          variant === "grid"
            ? "grid-cols-[1fr_auto] grid-rows-subgrid row-span-3 p-5 "
            : "w-[13rem] md:w-[16rem] lg:w-auto lg:gap-x-10 grid-cols-[auto_1fr] grid-rows-[auto_auto_1fr] "
        }`}
      >
        <div className={` ${variant === "grid" ? "col-span-2" : "row-span-3"}`}>
          <img src={coverUrl} alt={cover} className="object-cover w-auto h-full place-self-center"/>
        </div>
        <div className={`grid  ${variant === "grid" ? "grid-cols-subgrid col-span-2 grid-rows-subgrid row-span-2" : "grid-cols-1 grid-rows-subgrid row-span-3 py-5"}`}>          
          <p className={`font-semibold text-lg lg:text-xl text-[#090937] truncate ${variant === "grid" ? "col-span-2" : ""}`} title={name}>{name}</p>
          <p className="font-semibold text-sm lg:text-base text-[#090937]/60 truncate" title={author}>{author}</p>
          <p className={`font-bold text-sm sm:text-xl lg:text-2xl text-[#6251DD] text-nowrap ${variant === "grid" ? " place-self-end" : "justify-start self-end"}`}>{price} $</p>
       </div>
       {pathname === "/favorites" && 
       <Trash onClick={(e)=>{
        e.preventDefault()
        e.stopPropagation()
        if(user_id){
          trigger({
            user_id,
            product_id: Number(id),
          },{
            onSuccess: () => mutate?.()
          })
        }
       }} className="absolute right-0.5 top-0.5 text-[#EF6B4A] hover:scale-125 transition-all duration-100" />}
      </div>
    </Link>
  );
}

export default BookCard;
