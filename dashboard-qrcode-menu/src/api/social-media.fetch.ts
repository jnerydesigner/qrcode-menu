import { api } from ".";
import type {
    CreateSocialMediaDto,
    SocialMediaType,
    UpdateSocialMediaDto,
} from "@/types/social-media.type";

export const createSocialMedia = async (data: CreateSocialMediaDto) => {
    const response = await api.post<SocialMediaType>("/social-media", data);
    return response.data;
};

export const getSocialMediaByCompany = async (companyId: string) => {
    const response = await api.get<SocialMediaType[]>(
        `/social-media/company/${companyId}`
    );
    return response.data;
};

export const updateSocialMedia = async (
    id: string,
    data: UpdateSocialMediaDto
) => {
    const response = await api.patch<SocialMediaType>(
        `/social-media/${id}`,
        data
    );
    return response.data;
};

export const deleteSocialMedia = async (id: string) => {
    await api.delete(`/social-media/${id}`);
};
