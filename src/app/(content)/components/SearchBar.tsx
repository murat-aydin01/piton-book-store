"use client";
import { Search } from 'lucide-react';
import { useState, useEffect, useRef } from "react";
import { useBooks, useCoverImage } from "@/app/services/queries";
import { useRouter } from "next/navigation";
import type { ProductWithLikes } from "@/app/services/queries";

// This component is needed to use the hook for each book item
const BookItem = ({ book, onClick }: { book: ProductWithLikes; onClick: () => void }) => {
  const { coverUrl } = useCoverImage(book.cover);
  
  return (
    <div
      className="flex items-center gap-3 p-2 hover:bg-blue-100 rounded cursor-pointer"
      onClick={onClick}
    >
      <div className="w-12 h-16 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
        {coverUrl && (
          <img 
            src={coverUrl} 
            alt={book.name} 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col">
        <h4 className="font-medium text-sm line-clamp-1">{book.name}</h4>
        <p className="text-xs text-gray-600">by {book.author}</p>
        <p className="text-xs font-medium">${book.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<ProductWithLikes[]>([]);
  const { books, isLoading } = useBooks();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter books based on search term
  useEffect(() => {
    if (books && searchTerm.length > 0) {
      const filtered = books.filter(
        (book) =>
          book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchTerm, books]);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setShowResults(false);
      }
    };
    
    if (showResults) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showResults]);

  const handleBookClick = (id: number) => {
    router.push(`/books/${id}`);
    setShowResults(false);
    setSearchTerm("");
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div 
        onClick={() => inputRef.current?.focus()} 
        className="flex items-center h-full w-full hover:cursor-text focus-within:border focus-within:border-[#090937] rounded-sm bg-[#F4F4FF] text-[#090937]/60 box-content"
      >
        <Search className="h-full w-auto p-2.5 shrink-0" />
        <input 
          ref={inputRef}
          className="w-full border-none outline-none bg-transparent" 
          type="text" 
          placeholder="Search" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute z-20 w-full mt-1 bg-[#F4F4FF] border-2 border-[#090937]/10 rounded-sm shadow-2xl max-h-96 overflow-y-auto">
          <div className="p-2 bg-blue-100 text-sm font-medium">
            {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
          </div>
          <div className="p-2">
            {searchResults.map((book) => (
              <BookItem 
                key={book.id} 
                book={book} 
                onClick={() => handleBookClick(book.id)} 
              />
            ))}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {showResults && searchTerm.length > 0 && searchResults.length === 0 && !isLoading && (
        <div className="absolute z-20 w-full mt-1 bg-[#F4F4FF] border-2 border-[#090937]/10 rounded-sm shadow-2xl p-4 text-center">
          No books found matching &ldquo;{searchTerm}&rdquo;
        </div>
      )}

      {/* Loading State */}
      {isLoading && searchTerm.length > 0 && (
        <div className="absolute z-20 w-full mt-1 bg-[#F4F4FF] border-2 border-[#090937]/10 rounded-sm shadow-2xl p-4 text-center">
          Loading results...
        </div>
      )}
    </div>
  );
}

export default SearchBar;