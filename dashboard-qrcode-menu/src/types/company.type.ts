import type { SocialMediaType } from "./social-media.type";

export interface CompanyType {
    id: string;
    name: string;
    slug: string;
    image?: string;
    image_small?: string;
    createdAt: string;
    updatedAt: string;
    socialMedias: SocialMediaType[]
}
