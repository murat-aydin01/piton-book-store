"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import {ProductWithLikes, useBooks } from '../../services/queries'
import BookCard from './BookCard';

function CategoryBooks() {
    const path = usePathname()
    const id = Number(path.split('/').pop());
    const {books, isLoading} = useBooks(id)

    if(isLoading) return <p>yüklneiyor</p>
  return (
    <div className='grid md:grid-cols-3 lg:grid-cols-4 w-full h-auto gap-10'>
        {books?.map((book: ProductWithLikes)=>{
            return <BookCard id={book.id.toString()} variant='grid' cover={book.cover} name={book.name} author={book.author} price={book.price.toString()} key={book.id}/>
        })}
    </div>
  )
}

export default CategoryBooks