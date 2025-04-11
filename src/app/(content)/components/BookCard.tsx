import React from "react";
import { useCoverImage } from "../../services/queries";
import Link from "next/link";

type Props = {
  id: string;
  cover: string;
  name: string;
  author: string;
  price: string;
  variant: "raw" | "grid";
};

function BookCard({ id, cover, name, author, price, variant }: Props) {
  const { coverUrl, isLoading } = useCoverImage(cover);
  if (isLoading) return <p>yükleniyor</p>;

  return (
    <div
      className={`grid h-full justify-center gap-0 bg-[#F4F4FF] border border-[#090937]/10 rounded-sm 
      ${
        variant === "grid"
          ? "grid-cols-[1fr_auto] grid-rows-subgrid row-span-3 p-5 "
          : "grid-cols-2 grid-rows-[auto_auto_1fr] "
      }`}
    >
      <div className={` ${variant === "grid" ? "col-span-2" : "row-span-3"}`}>
        <img src={coverUrl} alt={cover} className="object-cover w-auto h-full place-self-center"/>
      </div>
      <div className={`grid  ${variant === "grid" ? "grid-cols-subgrid col-span-2" : "grid-rows-subgrid row-span-3"}`}>
        <div className={`grid  ${variant === "grid" ? "grid-rows-subgrid row-span-2" : "grid-rows-subgrid row-span-2"}`}>
          <p className="font-semibold text-xl text-[#090937] truncate">{name}</p>
          <p className="font-semibold text-[#090937]/60 truncate">{author}</p>
        </div>

        <p className={`font-bold text-2xl text-[#6251DD] text-nowrap ${variant === "grid" ? "row-span-2 place-self-end" : "justify-start self-end"}`}>{price} $</p>
      </div>
    </div>
  );
}

export default BookCard;
