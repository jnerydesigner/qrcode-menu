import { z } from "zod";

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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Login Data:", data);
    return { token: "mock-token", user: { name: "User", email: data.email } };
};

export const register = async (data: RegisterData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Register Data:", data);
    return { token: "mock-token", user: { name: data.name, email: data.email } };
};
