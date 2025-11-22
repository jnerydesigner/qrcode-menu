import Image from "next/image";
import Link from "next/link";
import { CompanyType } from "@/types/company.type";

interface CompanyCardProps {
    company: CompanyType;
}

export const CompanyCard = ({ company }: CompanyCardProps) => {
    return (
        <Link
            href={`/${company.slug}`}
            className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
        >
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={company.image}
                    alt={company.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {company.name}
                </h3>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Ver cardápio</span>
                    <svg
                        className="w-5 h-5 text-indigo-600 transform group-hover:translate-x-2 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </div>
            </div>
        </Link>
    );
};
