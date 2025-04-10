"use client";
import Carousel from "../components/Carousel";
import CategoryList from "../components/CategoryList";

export default function Home() {
  const images = ["/book1.png", "/book2.png", "/book3.png"]
  return (
    <>
    
    <Carousel images={images}/>
    <CategoryList />
    </>
  );
}
