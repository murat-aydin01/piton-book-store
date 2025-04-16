import useSWR from "swr";
import { coverFetcher } from "./api";

export type BaseProduct = {
  author: string;
  cover: string;
  description: string;
  id: number;
  name: string;
  price: number;
  sales: number;
  slug: string;
};

export type ProductByPk = BaseProduct & {
  category_id: number;
};

export type ProductWithLikes = BaseProduct & {
  created_at: string;
  likes_aggregate: {
    aggregate: {
      count: number;
    };
  };
};

export type ProductResponse = {
  product_by_pk: ProductByPk;
};

export type ProductsResponse = {
  product: ProductWithLikes[];
};

export type Category = {
  id: string;
  name: string;
  created_at: string;
};

export type Categories = {
  category: Category[];
};


export const useCategories = () => {
  const { data, error, isLoading } = useSWR<Categories>("/categories");
  return {
    categories: data?.category,
    error,
    isLoading,
  };
};

export const useCategoryBooks = (id: number | null) => {
  const { data, isLoading, error, mutate } = useSWR<ProductsResponse>(id ? `/products/${id}` : null);
  return {
    books: data?.product,
    error,
    isLoading,
    mutate
  };
};

export const useBooks = () => {
  const {data, isLoading, error, mutate} = useSWR<ProductsResponse>("/products")
  const favoriteBooks = data?.product.filter((book:ProductWithLikes)=>book.likes_aggregate.aggregate.count===1)
  return {
    books: data?.product,
    favoriteBooks,
    isLoading,
    mutate,
    error
  }
}

export const useBook = (id: number) => {
  const { data, isLoading: productLoading, error } = useSWR<ProductResponse>(`/product/${id}`);
  const categoryId = data?.product_by_pk.category_id

  const {books, isLoading: productsLoading, mutate} = useCategoryBooks(categoryId as number)
  const matchedBook = books?.find((book: ProductWithLikes)=>book.id === id)
  const isLiked = matchedBook?.likes_aggregate.aggregate.count
  
  return {
    book: data?.product_by_pk,
    isLiked,
    error,
    isLoading: productLoading || productsLoading,
    mutate,
  };
};

export const useCoverImage = (fileName: string) => {
  const { data, isLoading, error } = useSWR(fileName, coverFetcher);
  return {
    coverUrl: data,
    error,
    isLoading,
  };
};