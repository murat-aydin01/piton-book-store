import { Search } from 'lucide-react'
import React, { useRef } from 'react'

function SearchBar() {
    const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div onClick={()=>{inputRef.current?.focus()}} className="flex items-center h-full w-3xl hover:cursor-text focus-within:border focus-within:border-[#090937] rounded-sm bg-[#F4F4FF] text-[#090937]/60 box-content">
          <Search className="h-full w-auto p-2.5 shrink-0" />
          <input ref={inputRef} className="w-full border-none outline-none" type="text" placeholder="Search" />
        </div>
  )
}

export default SearchBar