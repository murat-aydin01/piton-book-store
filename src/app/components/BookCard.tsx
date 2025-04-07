import React from "react";
import { useCoverImage } from "../services/queries";

type Props = {
  cover: string;
  name: string;
  author: string;
  price: string;
};

function BookCard({ cover, name, author, price }: Props) {
  const { coverUrl, isLoading } = useCoverImage(cover);
  if (isLoading) return <p>yükleniyor</p>;
  return (
    <div className="flex shrink-0 justify-between gap-x-5 p-2.5 w-80 h-52 bg-[#F4F4FF] border border-[#090937]/10 rounded-sm ">
      <img src={coverUrl} alt={cover} />
      <div className="flex flex-col items-start justify-between p-2.5 grow">
        <div>
          <p className="font-semibold text-xl text-[#090937]">{name}</p>
          <p className="font-semibold text-[#090937]/60">{author}</p>
        </div>
        <p className="font-bold text-2xl text-[#6251DD]">{price} $</p>
      </div>
    </div>
  );
}

export default BookCard;
