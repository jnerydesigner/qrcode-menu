import { Api } from ".";

export const findAllCompanies = async <T>() => {
    const response = await Api.get("/company");

    if (response.status !== 200) {
        throw new Error("Not Found Exception");
    }

    const data: T = response.data;

    return data;
};

export const findCompanyBySlug = async <T>(slug: string) => {
    const response = await Api.get(`/company/${slug}`);

    if (response.status !== 200) {
        throw new Error("Not Found Exception");
    }

    const data: T = response.data;

    return data;
};