export interface SocialMediaType {
    id: string;
    name: string;
    link: string;
    svgPath: string;
    companyId: string;
    slug: string;
    createdAt: Date;
}

export interface CreateSocialMediaDto {
    name: string;
    link: string;
    svgPath: string;
    companyId: string;
}

export interface UpdateSocialMediaDto {
    name?: string;
    link?: string;
    svgPath?: string;
}
