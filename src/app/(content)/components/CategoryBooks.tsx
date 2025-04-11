"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import {Category, ProductWithLikes, useBooks, useCategories } from '../../services/queries'
import BookCard from './BookCard';
import ButtonBack from './ButtonBack';
import Loading from '@/app/(auth)/components/Loading';

function CategoryBooks() {
    const path = usePathname()
    const id = Number(path.split('/').pop());
    const {books, isLoading} = useBooks(id)
    const {categories} = useCategories()
    const categoryName = categories?.find((category: Category)=> Number(category.id) == id)

    if(isLoading) return <Loading/>
  return (
    <div className='flex flex-col gap-y-10 w-full h-full'>
      <ButtonBack label={categoryName?.name || "Kitaplar"}/>
      <div className='grid md:grid-cols-3 lg:grid-cols-4 w-full h-auto gap-10'>
          {books?.map((book: ProductWithLikes)=>{
              return <BookCard id={book.id.toString()} variant='grid' cover={book.cover} name={book.name} author={book.author} price={book.price.toString()} key={book.id}/>
          })}
      </div>
    </div>
  )
}

export default CategoryBooks