"use client";
import React, { useRef } from "react";

export const CategoryMenu = () => {
  const categories = [
    "Hamburger",
    "Bebidas",
    "Petiscos",
    "Acompanhamentos",
    "Sobremesas",
    "Combos",
  ];
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    const startX = e.pageX - scrollRef.current.offsetLeft;
    const scrollLeft = scrollRef.current.scrollLeft;

    const onMouseMove = (e: MouseEvent) => {
      const x = e.pageX - scrollRef.current!.offsetLeft;
      const walk = (x - startX) * 1.5; // velocidade do drag
      scrollRef.current!.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="px-4 mb-6 hover:cursor-pointer">
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        className="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide cursor-grab"
      >
        {categories.map((category, index) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium hover:cursor-pointer ${
              index === 0
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
