import { FormProducts } from "@/components/form-products";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function CreateProduct() {
    const navigate = useNavigate();

    return (
        <section className="space-y-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate("/dashboard/products")}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Novo Produto
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Preencha os dados abaixo para adicionar um novo item ao cardápio.
                    </p>
                </div>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
                <FormProducts onSuccess={() => navigate("/dashboard/products")} />
            </div>
        </section>
    );
}
