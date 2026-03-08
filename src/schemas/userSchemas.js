import { z } from 'zod';
export const updateProfileSchema = z.object({
    name: z
        .string()
        .min(2, 'Nome deve ter pelo menos 2 caracteres.')
        .max(100)
        .optional(),
    email: z
        .string()
        .email('Email inválido.')
        .max(255)
        .optional(),
    phone: z
        .string()
        .min(8, 'Telefone inválido.')
        .max(20)
        .optional(),
}).refine((data) => data.name || data.email || data.phone, {
    message: 'Pelo menos um campo deve ser enviado para atualização.',
});
export const changePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(6, 'Senha atual inválida.'),
    newPassword: z
        .string()
        .min(6, 'Nova senha deve ter no mínimo 6 caracteres.')
        .max(100),
});
