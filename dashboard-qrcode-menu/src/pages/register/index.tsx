import { AuthWrapper } from "@/components/auth-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { register as registerUser, registerSchema, type RegisterData } from "@/api/auth.fetch";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Register() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
    });

    const { mutate: handleRegister, isPending } = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            toast.success("Conta criada com sucesso!");
            navigate("/dashboard");
        },
        onError: (error) => {
            console.error("Register error:", error);
            toast.error("Erro ao criar conta.");
        },
    });

    const onSubmit = (data: RegisterData) => {
        handleRegister(data);
    };

    return (
        <AuthWrapper
            title="Criar conta"
            description="Preencha os dados abaixo para criar sua conta"
            footerText="Já tem uma conta?"
            footerLinkText="Faça login"
            footerLinkHref="/"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Seu nome completo"
                        {...register("name")}
                    />
                    {errors.name && (
                        <span className="text-sm text-red-500">{errors.name.message}</span>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        {...register("email")}
                    />
                    {errors.email && (
                        <span className="text-sm text-red-500">{errors.email.message}</span>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password")}
                    />
                    {errors.password && (
                        <span className="text-sm text-red-500">{errors.password.message}</span>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Senha</Label>
                    <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                        <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>
                    )}
                </div>
                <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
                    {isPending ? "Criando conta..." : "Criar conta"}
                </Button>
            </form>

            <div className="flex items-center gap-4">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">OU</span>
                <Separator className="flex-1" />
            </div>

            <Button variant="outline" className="w-full cursor-pointer" type="button">
                <FcGoogle />
                Criar conta com Google
            </Button>
        </AuthWrapper>
    )
}
