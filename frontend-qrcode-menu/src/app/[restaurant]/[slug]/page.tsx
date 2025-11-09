import { products } from "@/data/products";
import { convertMoney, TypeMoney } from "@/helper/convert-money";
import { Product } from "@/types/product.type";
import Image from "next/image";
import Link from "next/link";
import { FaArrowCircleLeft } from "react-icons/fa";

type tParams = Promise<{ slug: string; restaurant: string }>;

export default async function FoodDetails({ params }: { params: tParams }) {
  const { slug, restaurant } = await params;
  console.log("Restaurant:", restaurant);
  console.log("Slug:", slug);
  let data = await fetch(`http://localhost:3399/products/slug/${slug}`);
  let productFetch: Product = await data.json();
  console.log("Product Fetch:", productFetch);

  const ingredients = [
    { name: "Pão", emoji: "🍞", color: "bg-amber-600" },
    { name: "Carne", emoji: "🥩", color: "bg-amber-900" },
    { name: "Tomate", emoji: "🍅", color: "bg-red-500" },
    { name: "Queijo", emoji: "🧀", color: "bg-yellow-400" },
    { name: "Alface", emoji: "🥬", color: "bg-teal-400" },
  ];

  const ingredients2 = [
    { name: "Batata", icon: "🍟", color: "bg-amber-600" },
    { name: "Sal", icon: "🧂", color: "bg-amber-900" },
    { name: "Queijo", icon: "🧀", color: "bg-yellow-400" },
  ];
  return (
    <section className="max-w-md mx-auto bg-white shadow-2xl overflow-hidden animate-fade-in pt-4">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={`/${productFetch.image}`}
          alt={productFetch.name}
          fill
          className="object-cover"
          priority
        />

        <Link
          href="/"
          className="absolute top-5 left-5 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full text-white text-lg hover:bg-white/30 transition-all duration-300 hover:scale-110 z-10 cursor-pointer flex justify-center items-center"
        >
          <FaArrowCircleLeft className="w-8 h-8 text-black" />
        </Link>
      </div>
      <div className="p-8 relative">
        <div className="w-auto h-12 bg-gradient-to-r from-indigo-500 to-purple-600 px-4 flex justify-center items-center absolute z-20 -top-6 right-0 ">
          <p className="font-bold">{productFetch?.category.name}</p>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          {productFetch.name}
        </h1>
        <div className="flex items-center justify-center text-red-500 text-sm font-medium mb-6">
          <span className="text-xs mr-1">❤</span>
          Hamburgueria da Vila
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl mb-8 border-l-4 border-orange-400">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Descrição
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {productFetch?.description}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
            Ingredientes
          </h3>
          <div className="grid grid-cols-5 gap-4 justify-items-center">
            {productFetch.productIngredient.map((ingredient, index) => (
              <div
                key={ingredient.id}
                className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-8 h-8 ${ingredient.color} rounded-full flex items-center justify-center text-white text-sm shadow-md`}
                >
                  {ingredient.emoji}
                </div>
                <span className="text-xs text-gray-600 font-medium text-center">
                  {ingredient.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 text-center -mx-4">
        <div className="text-4xl font-bold mb-1">
          {convertMoney(productFetch.price, TypeMoney.PT_BR)}
        </div>
        <div className="text-sm opacity-80">Preço do produto</div>
      </div>
    </section>
  );
}
