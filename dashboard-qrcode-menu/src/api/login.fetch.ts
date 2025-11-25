import { api } from ".";

export const loginApiFetch = async (data: LoginData) => {
    const response = await api.post('/auth/login', data);
    return response.data;
};

export interface LoginData {
    email: string;
    password: string;
}