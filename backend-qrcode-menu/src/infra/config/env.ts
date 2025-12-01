import * as dotenv from 'dotenv';
dotenv.config();

import { z } from 'zod';

const envSchema = z.object({
    SERVER_PORT: z.string().transform((v) => Number(v)),
    DATABASE_URL: z.string(),
    MONGODB_URI: z.string(),
    DATABASE_PROVIDER: z.string(),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    AWS_REGION: z.string(),
    AWS_BUCKET_NAME: z.string(),
    QR_CODE_SECRET_KEY: z.string(),
    MAIL_HOST: z.string(),
    MAIL_PORT: z.string().transform((v) => Number(v)),
    MAIL_USER: z.string(),
    MAIL_PASS: z.string(),
    MAIL_SSL: z.string().transform((v) => Boolean(v)),
});

export const env = envSchema.parse(process.env);