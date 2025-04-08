import React from "react";
import { Book, useBooks } from "../services/queries";
import BookCard from "./BookCard";

type Props = {
  id: number;
};

function CategoryRaw({ id }: Props) {
  const { books, isLoading } = useBooks(id);
  const sliced = books?.slice(0,3);

  if (isLoading) return <p>yükleniyor</p>;
  return (
    <div className="flex gap-x-5 justify-around ">
      {sliced?.map((book: Book) => {
        return <BookCard variant="raw" cover={book.cover} name={book.name} author={book.author} price={book.price.toString()} key={book.id} />;
      })}
    </div>
  );
}

export default CategoryRaw;
