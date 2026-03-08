import { randomBytes, createHash } from 'crypto';
import prisma from '../database/prisma';
import { transporter } from '../utils/mail';
import { AppError } from '../utils/appError';
import { Hash } from '../utils/hash';
export class PasswordService {
    async requestReset(email) {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user)
            return;
        const token = randomBytes(32).toString("hex");
        const hashedToken = createHash('sha256')
            .update(token)
            .digest('hex');
        const expires = new Date(Date.now() + 1000 * 60 * 15);
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken: hashedToken,
                resetTokenExpires: expires,
            },
        });
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: email,
            subject: "Recuperação de senha",
            html: `
            <p>Clique no link para redefinir sua senha:</p>
            <a href="${resetLink}">${resetLink}</a>
        `
        });
    }
    async resetPassword(token, newPassword) {
        if (!token) {
            throw new AppError('Token não informado', 400);
        }
        const hashedToken = createHash('sha256')
            .update(token)
            .digest('hex');
        const user = await prisma.user.findFirst({
            where: {
                resetToken: hashedToken,
            },
        });
        if (!user) {
            throw new AppError('Token inválido!', 400);
        }
        if (!user.resetTokenExpires || new Date(user.resetTokenExpires) < new Date()) {
            throw new AppError('Token expirado', 400);
        }
        const hashedPassword = await Hash.generate(newPassword);
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpires: null,
            },
        });
    }
}
