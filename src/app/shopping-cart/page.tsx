/* eslint-disable @next/next/no-img-element */
"use client";

import CustomImage from "@/components/image";
import { ProductType } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ShoppingCart = () => {
  const [total, setTotal] = useState<number>(0);
  const router = useRouter()
  const [products, setProducts] = useState<ProductType[]>(
    JSON.parse(localStorage.getItem("carts") as string) || []
  );
  const removeProduct = (id: number) => {
    const updatedCart = products.filter((product) => product.id !== id);
    localStorage.setItem("carts", JSON.stringify(updatedCart));
    setProducts(updatedCart);
  };
  const handleInc = (id: number) => {
    const updatedCart = products.map((product) => {
      if (product.id == id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    localStorage.setItem("carts", JSON.stringify(updatedCart));
    setProducts(updatedCart);
  };
  const handleDec = (id: number) => {
    const p = products.find((pr) => pr.id == id);
    if (p?.quantity == 1) {
      removeProduct(p.id);
    } else {
      const updatedCart = products.map((product) => {
        if (product.id == id) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      localStorage.setItem("carts", JSON.stringify(updatedCart));
      setProducts(updatedCart);
    }
  };

  useEffect(() => {
    const sum = products.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(sum);
  }, [products]);
  return (
    <>
      {products.length ? (
        <div className="font-sans md:max-w-4xl mt-24 max-md:max-w-xl mx-auto bg-white py-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 p-4 rounded-md">
              <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
              <hr className="border-gray-300 mt-4 mb-8" />

              <div className="space-y-4">
                {products.map((c) => (
                  <div
                    key={c.id}
                    className="grid grid-cols-3 items-center gap-4 shadow p-3 relative"
                  >
                    <div className="col-span-2 flex items-center gap-4">
                      <div className="w-24 shrink-0 relative bg-white p-2 rounded-md">
                        <CustomImage product={c} />
                      </div>

                      <div>
                        <h3 className="text-base font-bold line-clamp-1 text-gray-800">
                          {c.title}
                        </h3>
                        <h6 className="text-sm cursor-pointer line-clamp-2 mt-0.5">
                          {c.description}
                        </h6>
                        <p
                          className="text-xs mt-2 cursor-pointer hover:underline text-red-500"
                          onClick={() => removeProduct(c.id)}
                        >
                          Remove product
                        </p>
                        <div className="flex gap-4 mt-4">
                          <div className="flex border rounded w-24 items-center">
                            <button
                              className="bg-gray-100 px-2.5 text-xl"
                              onClick={() => handleDec(c.id)}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="w-full outline-none text-center"
                              value={c.quantity}
                            />
                            <button
                              className="bg-gray-100 px-2 text-xl"
                              onClick={() => handleInc(c.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <h4 className="text-lg font-bold text-gray-800">
                        {(c.price * c.quantity).toLocaleString("en-US", {
                          currency: "usd",
                          style: "currency",
                        })}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-md p-4 md:sticky top-0">
              <div className="flex border border-blue-600 overflow-hidden rounded-md">
                <input
                  type="email"
                  placeholder="Promo code"
                  className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5"
                />
                <button
                  type="button"
                  className="flex items-center justify-center font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 px-4 text-sm text-white"
                >
                  Apply
                </button>
              </div>

              <ul className="text-gray-800 mt-8 space-y-4">
                <li className="flex flex-wrap gap-4 text-base">
                  Subtotal{" "}
                  <span className="ml-auto font-bold">
                    {total.toLocaleString("en-US", {
                      currency: "usd",
                      style: "currency",
                    })}
                  </span>
                </li>
                <li className="flex flex-wrap gap-4 text-base">
                  Shipping <span className="ml-auto font-bold">$5.00</span>
                </li>
                <li className="flex flex-wrap gap-4 text-base font-bold">
                  Total{" "}
                  <span className="ml-auto">
                    {(total + 5).toLocaleString("en-US", {
                      currency: "usd",
                      style: "currency",
                    })}
                  </span>
                </li>
              </ul>

              <div className="mt-8 space-y-2">
                <button
                  type="button"
                  className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  Checkout
                </button>
                <button
                  type="button"
                  className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
                >
                  Continue Shopping{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <section className="bg-white">
          <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
            <div className="wf-ull lg:w-1/2">
              <p className="text-sm font-medium text-blue-500">
                404 error
              </p>
              <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
                Page not found
              </h1>
              <p className="mt-4 text-gray-500">
                Sorry, the page you are looking for doesn't exist.Here are
                some helpful links:
              </p>

              <div className="flex items-center mt-6 gap-x-3">
                <button onClick={() => router.back()} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:rotate-180"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>

                  <span>Go back</span>
                </button>

                <button onClick={() => router.push('/')} className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600">
                  Take me home
                </button>
              </div>
            </div>

            <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
              <img
                className="w-full max-w-lg lg:mx-auto"
                src="https://merakiui.com/images/components/illustration.svg"
                alt=""
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ShoppingCart;
