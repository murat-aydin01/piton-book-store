import React from "react";
import { useCoverImage } from "../services/queries";

type Props = {
  cover: string;
  name: string;
  author: string;
  price: string;
  variant: "raw" | "grid";
};

function BookCard({ cover, name, author, price, variant }: Props) {
  const { coverUrl, isLoading } = useCoverImage(cover);
  if (isLoading) return <p>yükleniyor</p>;

  const containerClasses =
    variant === "raw"
      ? "flex justify-between gap-x-5 p-2.5 min-w-80 w-1/4 h-52 bg-[#F4F4FF] border border-[#090937]/10 rounded-sm"
      : "flex flex-col justify-between items-center p-5 bg-[#F4F4FF] border border-[#090937]/10 rounded-sm";

  const imageClasses = variant === "raw" ? "" : "mb-3";
  
  const contentClasses =
    variant === "raw"
      ? "flex flex-col items-start justify-between p-2.5 grow"
      : "flex justify-between w-full items-end";

  const textContainerClasses = "flex flex-col";
  const nameClasses = "font-semibold text-xl text-[#090937]";
  const authorClasses = "font-semibold text-[#090937]/60";
  const priceClasses = "font-bold text-2xl text-[#6251DD] text-nowrap";

  return (
    <div className={containerClasses}>
      <img className={imageClasses} src={coverUrl} alt={cover} />
      <div className={contentClasses}>
        <div className={textContainerClasses}>
          <p className={nameClasses}>{name}</p>
          <p className={authorClasses}>{author}</p>
        </div>
        <p className={priceClasses}>{price} $</p>
      </div>
    </div>
  );
}

export default BookCard;
