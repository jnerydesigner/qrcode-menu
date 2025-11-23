import { api } from ".";
import type { CompanyType } from "@/types/company.type";

export const findAllCompanies = async () => {
    const response = await api.get("/company");
    const data: CompanyType[] = response.data;

    return data;
};

export const findCompany = async (slug: string) => {
    const response = await api.get(`/company/hamburgueria-da-vila`);
    const data: CompanyType = response.data;

    console.log(data)

    return data;
};
