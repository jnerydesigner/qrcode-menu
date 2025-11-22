import { CompanyType } from "@/types/company.type";
import { CompanyCard } from "@/components/CompanyCard";

export default async function Home() {
  // Fetch all companies
  const dataCompanies = await fetch("http://localhost:3399/company");
  const companies: CompanyType[] = await dataCompanies.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            QR Code Menu
          </h1>
          <p className="text-lg text-gray-600">
            Escolha um restaurante para ver o cardápio
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>

        {/* Empty State */}
        {companies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              Nenhuma empresa cadastrada ainda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
