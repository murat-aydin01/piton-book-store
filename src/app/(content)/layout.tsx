import React from 'react'
import Header from './components/Header'

function ContentLayout({children}:{children:React.ReactNode}) {
  return (
    <div className='flex flex-col gap-y-10 px-16 '>
      <Header/>
        {children}
    </div>
  )
}

export default ContentLayout