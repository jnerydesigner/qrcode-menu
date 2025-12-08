import { api } from ".";
import type { CompanyType, CreateCompanyType } from "@/types/company.type";

export const findAllCompanies = async () => {
    const response = await api.get("/company");
    const data: CompanyType[] = response.data;

    return data;
};

export const findCompany = async (slug: string) => {
    const response = await api.get(`/company/hamburgueria-da-vila`);
    const data: CompanyType = response.data;

    return data;
};

export const createCompany = async (company: FormData) => {

    const response = await api.post("/company", company, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};
