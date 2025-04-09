"use client";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import Header from "../components/Header";

export default function Home() {
  const images = ["/book1.png", "/book2.png", "/book3.png"]
  return (
    <>
    <Header/>
    <Carousel images={images}/>
    {/* <Categories /> */}
    </>
    //<BookCard author="sdfa sadf" cover="dune.png" name="dune" price="456" variant="grid" />
  );
}
