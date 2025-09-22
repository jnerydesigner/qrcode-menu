"use client";
import Image from "next/image";
import React from "react";
import { CategoryMenu } from "./CategoryMenu";
import Link from "next/link";
import { products } from "@/data/products";
import { Product } from "@/types/product.type";
import { convertMoney, TypeMoney } from "@/helper/convert-money";
import { CategoryType } from "@/types/category.type";

interface ProductsProps {
  products: Product[];
  categories: CategoryType[];
}

export const PageMenu = ({
  products: productsNew,
  categories,
}: ProductsProps) => {
  return (
    <div className="min-h-screen bg-[#fdf5e6] flex justify-center">
      <div className="w-full max-w-md">
        <div className="sticky top-0 bg-[#fdf5e6] z-20 mb-6">
          <div className="flex flex-col items-center py-4">
            <Image
              src="/logo.png"
              alt="Buck's Burgers"
              width={200}
              height={160}
              priority
            />
          </div>
          <CategoryMenu categories={categories} />
        </div>

        <div className="px-4 space-y-6">
          {productsNew.map((product, index) => {
            const firstOfCategory =
              index ===
              productsNew.findIndex((p) => p.categoryId === product.categoryId);

            const lastOfCategory =
              index ===
              productsNew.findLastIndex(
                (p) => p.categoryId === product.categoryId
              );

            return (
              <Link
                href={`/hamproductia-sonho-meu/${product.slug}`}
                key={product.id}
                id={
                  firstOfCategory || lastOfCategory
                    ? product.categoryId
                    : undefined
                }
                className="flex h-40 shadow-sm"
              >
                <div className="relative w-40 h-full flex-shrink-0">
                  <Image
                    src={`/${product.image}`}
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
                    {convertMoney(product.price, TypeMoney.PT_BR)}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
