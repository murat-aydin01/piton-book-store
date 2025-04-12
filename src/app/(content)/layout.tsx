import React from 'react'
import Header from './components/Header'

function ContentLayout({children}:{children:React.ReactNode}) {
  return (
    <div className='flex flex-col gap-y-5 lg:gap-y-10 min-h-screen px-5 lg:px-16 pb-10'>
      <Header/>
        {children}
    </div>
  )
}

export default ContentLayout