import { z } from "zod";
import { api } from ".";

export const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type LoginData = z.infer<typeof loginSchema>;

export const registerSchema = z
    .object({
        name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
        email: z.string().email("Email inválido"),
        password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
        confirmPassword: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    });

export type RegisterData = z.infer<typeof registerSchema>;

export const login = async (data: LoginData) => {
    const response = await api.post('/auth/login', data);

    if (response.status !== 200) {
        throw new Error("Erro ao realizar login");
    }

    return response.data;
};

export const register = async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);

    if (response.status !== 201) {
        throw new Error("Erro ao realizar cadastro");
    }

    return response.data;
};
