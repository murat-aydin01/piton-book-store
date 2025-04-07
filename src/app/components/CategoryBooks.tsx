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
    <div className='grid grid-cols-4 gap-5'>
        {books?.map((book: Book)=>{
            return <BookCard cover={book.cover} name={book.name} author={book.author} price={book.price.toString()} key={book.id}/> /* TODO aynı api isteklerini tekrar yapmak yerine cahce'den alabilir mi? */
        })}
    </div>
  )
}

export default CategoryBooks