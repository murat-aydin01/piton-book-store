import React from 'react'

function ContentLayout({children}:{children:React.ReactNode}) {
  return (
    <div className='flex flex-col gap-y-10 px-16 '>
        {children}
    </div>
  )
}

export default ContentLayout