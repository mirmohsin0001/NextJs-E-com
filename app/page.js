import Features from "./components/Features";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Tesmonials from "./components/Tesmonials";

export default function Home() {
  return (
    <>
    <Navbar/>
      <Hero />
      <Products />
      <Features />
      <Tesmonials />
    </>
  );
}
