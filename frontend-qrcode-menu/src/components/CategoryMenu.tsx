"use client";
import { CategoryType } from "@/types/category.type";
import React, { useEffect, useRef, useState } from "react";

interface CategoryProps {
  categories: CategoryType[];
}

export const CategoryMenu = ({ categories }: CategoryProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>("");

  // --- Drag Scroll ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    const startX = e.pageX - scrollRef.current.offsetLeft;
    const scrollLeft = scrollRef.current.scrollLeft;

    const onMouseMove = (e: MouseEvent) => {
      const x = e.pageX - scrollRef.current!.offsetLeft;
      const walk = (x - startX) * 1.5;
      scrollRef.current!.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // --- Scroll até a categoria ---
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // --- Detectar categoria ativa ---
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    categories.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setActive(cat.id);
          }
        },
        {
          threshold: 0.3,
          rootMargin: "-30% 0px -60% 0px", // ajuda ao subir
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [categories]);

  return (
    <div className="px-4 mb-2 select-none">
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        className="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide cursor-grab"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleScrollTo(category.id)}
            ref={(el) => {
              if (el && active === category.id) {
                el.scrollIntoView({
                  behavior: "smooth",
                  inline: "center",
                  block: "nearest",
                });
              }
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              active === category.id
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
