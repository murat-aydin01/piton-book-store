import React from "react";
import {  ProductWithLikes, useBooks } from "../../services/queries";
import BookCard from "./BookCard";
import Loading from "@/app/(auth)/components/Loading";

type Props = {
  id: number;
};

function CategoryRaw({ id }: Props) {
  const { books, isLoading } = useBooks(id);
  const sliced = books?.slice(0,3);

  if (isLoading) return <Loading/>
  return (
    <div className="grid grid-flow-col auto-cols-auto lg:auto-cols-fr overflow-auto grid-rows-[9rem] lg:grid-rows-[13rem] gap-x-10 justify-between ">
      {sliced?.map((book: ProductWithLikes) => {
        return <BookCard id={book.id.toString()} variant="raw" cover={book.cover} name={book.name} author={book.author} price={book.price.toString()} key={book.id} />;
      })}
    </div>
  );
}

export default CategoryRaw;
