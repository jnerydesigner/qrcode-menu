"use client";
import Image from "next/image";
import React from "react";
import { CategoryMenu } from "./CategoryMenu";
import Link from "next/link";
import { products } from "@/data/products";

export const PageMenu = () => {
  const productsRestaurant = products;

  return (
    <div className="min-h-screen bg-[#fdf5e6] flex justify-center">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center py-8">
          <Image
            src="/logo.png"
            alt="Buck's Burgers"
            width={250}
            height={200}
            priority
          />
        </div>

        <CategoryMenu />

        <div className="px-4 space-y-6">
          {productsRestaurant.map((product) => (
            <Link
              href={`/hamproductia-sonho-meu/${product.slug}`}
              key={product.id}
              className="flex h-40 shadow-sm"
            >
              <div className="relative w-40 h-full flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                </div>
                <div className="text-right font-bold text-lg mt-2">
                  {product.price}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
