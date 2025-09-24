import React from "react";
import { Package, Layers, Tag } from "lucide-react";
import HeaderDashboard from "@/components/HeaderDashboard";
import HeaderMenuSideBar from "@/components/HeaderMenuSideBar";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      href: "/dashboard/category",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        <HeaderMenuSideBar />

        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 group"
                  >
                    <IconComponent className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-700" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="flex-1 flex flex-col">
        <HeaderDashboard />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
