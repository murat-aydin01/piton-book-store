import { Heart, ShoppingCart, User } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between items-center w-full h-32'>
        <img src="/Logo.png" alt="logo" className='h-12' />
        <input className='h-12' type="text" placeholder='Search' />
        <div className='flex h-12 items-stretch'>
            <User className='h-12' />
            <Heart className='h-12' />
            <ShoppingCart className='h-12'/>
        </div>
    </div>
  )
}

export default Header