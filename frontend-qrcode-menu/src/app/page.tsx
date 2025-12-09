import { CompanyType } from "@/types/company.type";
import { CompanyCard } from "@/components/CompanyCard";
import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FinalResultSection from "@/components/sections/FinalResultSection";
import EasyAdministerSection from "@/components/sections/EasyAdministerSection";
import ClientsSection from "@/components/sections/ClientsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import PriceSection from "@/components/sections/PriceSection";
import NumbersSection from "@/components/sections/NumbersSection";
import ContactSection from "@/components/sections/ContactSection";

export default async function Home() {
  // Fetch all companies
  const dataCompanies = await fetch("http://localhost:3399/company");
  const companies: CompanyType[] = await dataCompanies.json();
  console.log(companies)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <FinalResultSection />
      <EasyAdministerSection />
      <ClientsSection />
      <FeaturesSection />
      <PriceSection />
      <NumbersSection />
      <ContactSection />
    </div>
  );
}