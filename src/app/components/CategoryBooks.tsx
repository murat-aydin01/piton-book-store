"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import { Book, useBooks } from '../services/queries'
import BookCard from './BookCard';

function CategoryBooks() {
    const path = usePathname()
    const id = Number(path.split('/').pop());
    const {books, isLoading} = useBooks(id)

    if(isLoading) return <p>yüklneiyor</p>
  return (
    <div className='grid grid-cols-4 gap-10'>
        {books?.map((book: Book)=>{
            return <BookCard variant='grid' cover={book.cover} name={book.name} author={book.author} price={book.price.toString()} key={book.id}/>
        })}
    </div>
  )
}

export default CategoryBooks