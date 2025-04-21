"use client"

import { ProductWithLikes, useBooks } from '@/app/services/queries';
import { Search } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import SearchItem from './SearchItem';
import { useRouter } from 'next/navigation';

function SearchBar() {
    const {books} = useBooks()
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [showResults, setShowResults] = useState<boolean>(false)
    const [results, setResults] = useState<ProductWithLikes[]>([])

    useEffect(()=>{
      if(books && searchTerm.length > 0) {
        const filtered = books?.filter((book)=>{
          return book.author.toLowerCase().includes(searchTerm.toLowerCase()) || 
          book.name.toLowerCase().includes(searchTerm.toLowerCase())
         })
        setResults(filtered)
        setShowResults(true)
      } else {
        setResults([])
        setShowResults(false)
      }
    },[searchTerm, books])

    useEffect(()=>{
      const handleClickOutside = (e: MouseEvent) => {
        if(searchRef.current && !searchRef.current.contains(e.target as Node)) {
          setSearchTerm("")
          setShowResults(false)
        }
      }
      if(showResults) {
        document.addEventListener("mousedown", handleClickOutside)
      } else {
        document.removeEventListener("mousedown", handleClickOutside)
      }
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [showResults])

    const handleBookClick = (id: number) => {
      router.push(`/books/${id}`)
      setShowResults(false)
      setSearchTerm("")
    }

  return (
    <div ref={searchRef} onClick={()=>{inputRef.current?.focus()}} className="relative flex items-center h-full w-3xl hover:cursor-text focus-within:border focus-within:border-[#090937] rounded-sm bg-[#F4F4FF] text-[#090937]/60 box-content">
      <Search className="h-full w-auto p-2.5 shrink-0" />
      <input ref={inputRef} value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}} className="w-full border-none outline-none" type="text" placeholder="Search" />
      {showResults && <div className='absolute flex flex-col gap-y-2.5 w-full max-h-96 overflow-y-auto right-0 left-0 top-full z-20 bg-[#F4F4FF] shadow-2xl rounded-sm border'>
        {results.map((result)=><SearchItem handleClick={()=>{handleBookClick(result.id)}} key={result.id} book={result} />)}
      </div>}
    </div>
  )
}

export default SearchBar