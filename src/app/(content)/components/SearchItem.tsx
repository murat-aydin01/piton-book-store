import { ProductWithLikes, useCoverImage } from '@/app/services/queries'
import React from 'react'

type Props = {
    book: ProductWithLikes;
    handleClick: ()=>void
}

function SearchItem({book, handleClick}: Props) {
    const {coverUrl} = useCoverImage(book.cover)
  return (
    <div onClick={handleClick} className='flex w-full h-20 hover:cursor-pointer'>
        <img src={coverUrl} className='object-cover h-full w-auto' />
        <div className='flex flex-col'>
            <p>{book.name}</p>
            <p>{book.author}</p>
            <p>{book.price}</p>
        </div>
    </div>
  )
}

export default SearchItem