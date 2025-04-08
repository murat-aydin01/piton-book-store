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

export const useBooks = (id: number) => {
  const { data, isLoading, error } = useSWR<ProductsResponse>(`/products/${id}`);
  return {
    books: data?.product,
    error,
    isLoading,
  };
};

export const useBook = (id: number) => {
  const { data, isLoading, error } = useSWR<ProductResponse>(`/product/${id}`);
  return {
    book: data?.product_by_pk,
    error,
    isLoading,
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