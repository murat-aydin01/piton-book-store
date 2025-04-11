import React from "react";
import {  ProductWithLikes, useBooks } from "../../services/queries";
import BookCard from "./BookCard";

type Props = {
  id: number;
};

function CategoryRaw({ id }: Props) {
  const { books, isLoading } = useBooks(id);
  const sliced = books?.slice(0,3);

  if (isLoading) return <p>yükleniyor</p>;
  return (
    <div className="grid grid-cols-3 grid-rows-[13rem] gap-x-10 justify-between ">
      {sliced?.map((book: ProductWithLikes) => {
        return <BookCard id={book.id.toString()} variant="raw" cover={book.cover} name={book.name} author={book.author} price={book.price.toString()} key={book.id} />;
      })}
    </div>
  );
}

export default CategoryRaw;
