"use client";
import Image from "next/image";
import React from "react";
import { CategoryMenu } from "./CategoryMenu";
import Link from "next/link";
import { products } from "@/data/products";
import { Product } from "@/types/product.type";
import { convertMoney, TypeMoney } from "@/helper/convert-money";
import { CategoryType } from "@/types/category.type";
import { CompanyType } from "@/types/company.type";
import { FaArrowCircleLeft } from "react-icons/fa";

interface ProductsProps {
  products: Product[];
  categories: CategoryType[];
  company: CompanyType
}

export const PageMenu = ({
  products: productsNew,
  categories,
  company
}: ProductsProps) => {
  return (
    <div className="min-h-screen bg-[#fdf5e6] flex justify-center">
      <div className="w-full max-w-md">
        <div className="sticky top-0 bg-[#fdf5e6] z-20 mb-6">
          <div className="flex flex-col items-center py-4 relative">
            <Link
              href="/"
              className="absolute top-4 left-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full text-gray-800 hover:bg-white transition-all duration-300 hover:scale-110 z-10 cursor-pointer flex justify-center items-center shadow-md"
            >
              <FaArrowCircleLeft className="w-6 h-6" />
            </Link>
            <Image
              src={company.image}
              alt={company.name}
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

            return (
              <Link
                href={`/${company.slug}/${product.slug}`}
                key={product.id}
                id={
                  firstOfCategory
                    ? product.categoryId
                    : undefined
                }
                className="flex h-40 shadow-sm scroll-mt-64"
              >
                <div className="relative w-40 h-full flex-shrink-0">
                  <Image
                    src={`${product.image}`}
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
