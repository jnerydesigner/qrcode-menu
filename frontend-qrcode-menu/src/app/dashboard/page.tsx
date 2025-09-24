import React from "react";
import { Package, Layers, Tag } from "lucide-react";

export default function HomeDashboard() {
  const menuItems = [
    {
      id: "produtos",
      label: "Produtos",
      icon: Package,
      href: "#produtos",
    },
    {
      id: "ingredientes",
      label: "Ingredientes",
      icon: Layers,
      href: "#ingredientes",
    },
    {
      id: "categoria",
      label: "Categoria",
      icon: Tag,
      href: "#categoria",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Bem-vindo ao Dashboard
      </h3>
      <p className="text-gray-600 mb-8">
        Selecione uma opção no menu lateral para começar a gerenciar seus dados.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <IconComponent className="w-8 h-8 text-blue-500" />
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    {item.label}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Gerenciar {item.label.toLowerCase()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
