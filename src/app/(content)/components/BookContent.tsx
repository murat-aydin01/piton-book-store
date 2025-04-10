"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import { useBook, useCoverImage } from '../../services/queries'
import { Heart } from 'lucide-react'
import ButtonBuy from './ButtonBuy'

function BookContent() {

  const path = usePathname()
  const id = Number(path.split("/").pop())
  const {book, isLoading} = useBook(id);
  const {coverUrl} = useCoverImage(`${book?.cover}`)

  if(isLoading) return <p>yükleniyor</p>
  if(!book) return <p>bulunamadı</p>
  return (
    <div className='flex flex-col gap-y-10 w-full h-full'>
      <div>geri butonu</div>
      <div className='flex justify-between gap-x-20 relative'>
        <img src={coverUrl} alt={book?.cover} className='p-14 bg-[#F4F4FF] border-[#090937]/10 rounded w-[300px] h-[450px] object-cover' />
        <div className='flex flex-col justify-start gap-y-14'>
          <div className='flex justify-between items-start w-[200px]'><div>
            <p className='font-semibold text-4xl text-black'>{book?.name}</p>
              <p className='font-semibold text-3xl text-black/60'>{book?.author}</p>
          </div>
          
          </div>
          <div className='flex flex-col'>
            <p className='font-bold text-2xl text-[#090937]'>Summary</p>
            <p className='text-xl text-[#090937]/60'>{book?.description}</p></div>
        </div>
        <Heart className='absolute top-0 right-0' />
      </div>
      <ButtonBuy className='bg-[#EF6B4A] text-white text-xl rounded-sm py-2.5 px-5 w-[400px] self-end flex justify-between '><span className='font-bold'>{book.price}</span><span className='font-semibold'>Buy Now</span></ButtonBuy>
    </div>
  )
}

export default BookContent