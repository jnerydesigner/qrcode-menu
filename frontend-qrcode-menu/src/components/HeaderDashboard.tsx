import React from "react";

export default function HeaderDashboard() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">
          {new Date().toLocaleDateString("pt-BR")}
        </span>
      </div>
    </header>
  );
}
