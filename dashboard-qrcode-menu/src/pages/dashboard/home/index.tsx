import { findAllCompanies } from "@/api/companies.fetch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Building2, Calendar } from "lucide-react";

export default function DashboardHome() {
    const { data: companies, isLoading, isError } = useQuery({
        queryKey: ["companies"],
        queryFn: findAllCompanies,
    });

    if (isLoading) {
        return <div className="p-8 text-center">Carregando empresas...</div>;
    }

    if (isError) {
        return <div className="p-8 text-center text-red-500">Erro ao carregar empresas.</div>;
    }

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Empresas</h1>
                <p className="text-muted-foreground">
                    Gerencie as empresas cadastradas no sistema.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {companies?.map((company) => (
                    <Card key={company.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-bold">
                                {company.name}
                            </CardTitle>
                            <Building2 className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4 mt-4">
                                {company.image && (
                                    <div className="relative h-32 w-full overflow-hidden rounded-md">
                                        <img
                                            src={company.image}
                                            alt={company.name}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                )}
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Cadastrado em: {new Date(company.createdAt).toLocaleDateString('pt-BR')}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Slug: <span className="font-mono bg-muted px-1 rounded">{company.slug}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
