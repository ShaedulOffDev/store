import Hero from "@/components/hero";
import Product from "@/components/product";
import { ProductType } from "@/interfaces";
import React from "react";

const HomePage = async () => {
  const res = await fetch("https://fakestoreapi.com/products/");
  const products: ProductType[] = await res.json();

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0 mt-10">
      <Hero />
      <section className="flex flex-col space-y-12">
        <h1 className="text-5xl font-bold text-center">Store Deals</h1>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((p) => (
            <Product product={p} key={p.id} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
