import { Api } from ".";

export const createMagicLink = async (email: string): Promise<{ status: 'created' | 'resent'; email: string; magicLink: string }> => {
    const response = await Api.post('/magic-link', { email });

    console.log(response.data)

    return {
        status: 'created',
        email,
        magicLink: response.data.magicLink
    };
};