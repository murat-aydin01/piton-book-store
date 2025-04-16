"use client"
import { ProductWithLikes, useBooks } from '@/app/services/queries'
import React from 'react'
import BookCard from '../components/BookCard';
import ButtonBack from '../components/ButtonBack';
import Loading from '@/app/(auth)/components/Loading';

function Favorites() {
    const {favoriteBooks, isLoading, mutate} = useBooks();

  if(isLoading) return <Loading/>
  return (
    <div className='flex flex-col gap-y-10 w-full'>
      <ButtonBack label={"Favorites"}/>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full h-auto gap-10'>
          {favoriteBooks?.map((book: ProductWithLikes)=>{
              return <BookCard mutate={mutate} id={book.id.toString()} variant='grid' cover={book.cover} name={book.name} author={book.author} price={book.price.toString()} key={book.id}/>
          })}
      </div>
    </div>
  )
}

export default Favorites