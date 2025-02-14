import Features from "./components/Features";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import ProductsGrid from "./components/ProductsGrid";
import Tesmonials from "./components/Tesmonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="flex flex-col text-center w-full mt-16 mb-16">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">FIND YOUR FAVOURITES</h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Introducing Our Products</h1>
      </div>
      <Products />
      <Features />
      <Tesmonials />
    </>
  );
}
