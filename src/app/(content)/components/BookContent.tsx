"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import { useBook, useCoverImage } from '../../services/queries'
import {  Heart } from 'lucide-react'
import ButtonBuy from './ButtonBuy'
import ButtonBack from './ButtonBack'
import Loading from '@/app/(auth)/components/Loading'
import useSWRMutation from 'swr/mutation'
import { likeFetcher } from '@/app/services/api'
import { jwtDecode } from 'jwt-decode'
import { getToken } from '@/app/(auth)/utils/authLocalStorage'

interface MyJwtPayload {
  user_id: number;
  email: string;
  iat: number;
  exp: number;
  "https://hasura.io/jwt/claims"?: {
    "x-hasura-user-id": string;
    "x-hasura-default-role": string;
    "x-hasura-allowed-roles": string[];
  };
}


function BookContent() {

  const path = usePathname()
  const id = Number(path.split("/").pop())
  const {book, isLiked, isLoading, mutate} = useBook(id);
  const {coverUrl} = useCoverImage(`${book?.cover}`)
  const {trigger: like} = useSWRMutation("/like", likeFetcher,)
  const {trigger: unlike} = useSWRMutation("/unlike", likeFetcher)
  const decoded = jwtDecode<MyJwtPayload>(getToken() as string)
  const user_id = decoded.user_id

  const handleLike = () => {
         if(isLiked){
          unlike({user_id, product_id: id}, {
            onSuccess: () => {mutate()},
          })
         }else{
          like({user_id, product_id: id}, {
            onSuccess: () => {mutate()},
          })
         }
  }

  if(isLoading) return <Loading/>
  if(!book) return <p>bulunamadı</p>
  return (
    <div className='flex flex-col  gap-y-10 w-full'>
      <ButtonBack label="Book Details" />
      <div className='flex flex-col items-center gap-y-10 lg:flex-row justify-between gap-x-20 relative'>
        <img src={coverUrl} alt={book?.cover} className='bg-[#F4F4FF] border-[#090937]/10 rounded w-1/4 lg:w-[20rem] xl:w-[26rem] h-auto md:p-5 lg:p-14 object-cover' />
        <div className='flex flex-col justify-start items-center lg:items-start gap-y-14 max-w-4xl'>
          <div className='flex flex-col justify-between items-center gap-y-2.5 lg:items-start w-auto'>
            <p className='font-semibold text-xl md:text-4xl text-black text-nowrap'>{book?.name}</p>
            <p className='font-semibold text-base md:text-3xl text-black/60 text-nowrap'>{book?.author}</p>
          </div>
          <div className='flex flex-col items-center lg:items-start gap-y-2.5'>
            <p className='font-bold text-xl md:text-2xl text-[#090937]'>Summary</p>
            <p className='text-base md:text-xl text-[#090937]/60'>{book?.description}</p>
          </div>
        </div>
        <Heart onClick={handleLike} fill={isLiked ? "#6251DD" : "#FFFFFF" } className='absolute top-0 right-0 h-11 w-11 bg-[#F4F4FF] rounded-full p-2.5 ' color='#6251DD'/>
      </div>
      <ButtonBuy className='flex justify-between bg-[#EF6B4A] text-white text-xl rounded-sm py-2.5 px-5 w-full  lg:w-[25rem] mt-auto self-end '><span className='font-bold'>{book.price} $</span><span className='font-semibold'>Buy Now</span></ButtonBuy>
    </div>
  )
}

export default BookContent