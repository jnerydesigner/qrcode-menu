import TableCategories from "@/components/TableCategories";
import React from "react";

export default function PageCategory() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Bem-vindo a Category
      </h3>
      <TableCategories />
    </div>
  );
}
