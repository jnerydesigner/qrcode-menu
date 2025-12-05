import * as dotenv from 'dotenv';
dotenv.config();

import { z } from 'zod';

// Schema das variáveis de ambiente
const envSchema = z.object({
    SERVER_PORT: z.coerce.number().min(1).max(65535),
    DATABASE_URL: z.string().url(),
    MONGODB_URI: z.string(),
    DATABASE_PROVIDER: z.string(),

    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    AWS_REGION: z.string(),
    AWS_BUCKET_NAME: z.string(),

    QR_CODE_SECRET_KEY: z.string(),

    MAIL_HOST: z.string(),
    MAIL_PORT: z.coerce.number(),
    MAIL_USER: z.string(),
    MAIL_PASS: z.string(),
    MAIL_SSL: z.string().transform((v) => v === 'true'),
    SEND_MAIL: z.string().transform((v) => v === 'true'),
    RABBITMQ_DEFAULT_USER: z.string(),
    RABBITMQ_DEFAULT_PASS: z.string(),
});

// Faz o parse e valida
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("❌ Erro ao validar variáveis de ambiente:");
    console.error(parsed.error.format());

    /**
     * Aqui você pode usar:
     * - process.exit(1);
     * - jogar exceção
     * - mandar log para Sentry
     */
    throw new Error("Variáveis de ambiente inválidas. Corrija o .env.");
}

export const env = parsed.data;
