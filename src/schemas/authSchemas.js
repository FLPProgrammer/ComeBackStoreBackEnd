import { z } from 'zod';
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email é obrigatório.')
        .email('Email inválido')
        .max(255),
    password: z
        .string()
        .min(6, 'Senha deve ter pelo menos 6 caracteres.')
        .max(100),
});
export const registerSchema = z.object({
    name: z.
        string()
        .min(2, 'Nome deve ter pelo menos 2 caracteres.')
        .max(100),
    email: z
        .string()
        .email('Email inválido')
        .max(255),
    password: z
        .string()
        .min(6, 'Senha deve ter no mínimo 6 caracteres')
        .max(100),
});
