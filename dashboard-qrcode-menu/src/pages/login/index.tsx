import { AuthWrapper } from "@/components/auth-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginSchema, type LoginData } from "@/api/auth.fetch";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "@/contexts/use-auth";
import { loginApiFetch } from "@/api/login.fetch";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();   // 🔥 TEM QUE FICAR AQUI (TOPO DO COMPONENTE)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
    });

    const { mutate: handleLogin, isPending } = useMutation({
        mutationFn: loginApiFetch,
        onSuccess: async (data) => {

            await login(); // Agora pode usar o hook COM SEGURANÇA

            toast.success("Login realizado com sucesso!");
            navigate("/dashboard");
        },
        onError: (error) => {
            console.error("Login error:", error);
            toast.error("Erro ao realizar login.");
        },
    });

    const onSubmit = (data: LoginData) => {
        handleLogin(data);
    };

    return (
        <AuthWrapper
            title="Login"
            description="Entre com seu email e senha ou use sua conta Google"
            footerText="Não tem uma conta?"
            footerLinkText="Cadastre-se"
            footerLinkHref="/register"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
                    {isPending ? "Entrando..." : "Entrar"}
                </Button>
            </form>

            <div className="flex items-center gap-4">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">OU</span>
                <Separator className="flex-1" />
            </div>

            <Button variant="outline" className="w-full cursor-pointer" type="button">
                <FcGoogle />
                Entrar com Google
            </Button>
        </AuthWrapper>
    );
}
