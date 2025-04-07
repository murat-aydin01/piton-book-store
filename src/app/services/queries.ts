import useSWR from "swr";
import { coverFethcer } from "./api";

type Category = {
  id: string;
  name: string;
  created_at: string;
};

type Categories = {
  category: Category[];
};

export type Book = {
  id: number;
  name: string;
  author: string;
  cover: string;
  created_at: string;
  description: string;
  price: number;
  sales: number;
  slug: string;
  likes_aggregate: {
    aggregate: {
      count: number;
    };
  };
};

type Books = {
  product: Book[];
};

export const useCategories = () => {
  const { data, error, isLoading } = useSWR<Categories>("/categories");
  return {
    categories: data?.category,
    error,
    isLoading,
  };
};

export const useBooks = (id: number) => {
  const { data, isLoading, error } = useSWR<Books>(`/products/${id}`);
  return {
    books: data?.product,
    error,
    isLoading,
  }
};

export const useCoverImage = (fileName: string) => {
    const {data, isLoading, error} = useSWR(fileName, coverFethcer)
    return {
        coverUrl: data,
        error,
        isLoading,
    }
}