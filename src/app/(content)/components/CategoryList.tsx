import React from 'react'
import { useCategories } from '../../services/queries';
import CategoryRaw from './CategoryRaw';
import Link from 'next/link';

function CategoryList() {
    const { categories, isLoading } = useCategories();
  if (isLoading) return <p>yükleniyor</p>;
  return (
    <div className="flex flex-col gap-y-16">
      {categories?.map((category) => {
        return (
          <div key={category.id} className="flex flex-col gap-y-5">
            <div className="flex justify-between h-auto">
              <p className='text-[#090937] font-bold text-3xl'>{category.name}</p>
              <Link href={`/categories/${category.id}`} className='font-bold text-xl text-[#EF6B4A]'>Viev All</Link>
            </div>
            <CategoryRaw id={Number(category.id)} />
          </div>
        );
      })}
    </div>
  )
}

export default CategoryList