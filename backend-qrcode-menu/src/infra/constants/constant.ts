import 'dotenv/config';

export const jwtConstants = {
    secret: process.env.QR_CODE_SECRET_KEY ?? 'default-secret-key',
};