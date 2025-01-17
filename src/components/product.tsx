"use client";

import { ProductType } from "@/interfaces";
import Link from "next/link";
import { FC } from "react";
import CustomImage from "./image";

const Product: FC<{ product: ProductType }> = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} className="flex-col p-6 rounded-lg flex group hover:scale-105 transition-transform ease-out duration-200 h-96">
      <div className="relative max-h-80 flex-1">
        <CustomImage product={product} fill/>
      </div>
      <h3 className="tracking-widest mt-5 text-indigo-500 text-xs font-medium title-font capitalize">
        {product.category}
      </h3>
      <div className="font-semibold flex items-center justify-between mt-4 mb-1">
        <p className="w-44 truncate text-lg text-gray-900 font-medium title-font mb-4">
          {product.title}
        </p>
        <p>${product.price}</p>
      </div>
      <p className="leading-relaxed text-base line-clamp-2">
        {product.description}
      </p>
    </Link>
  );
};

export default Product;
