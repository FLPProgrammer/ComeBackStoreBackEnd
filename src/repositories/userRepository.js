import prisma from '../database/prisma';
export class UserRepository {
    findByEmail = async (email) => {
        return prisma.user.findUnique({
            where: { email },
        });
    };
    findById = async (id) => {
        return prisma.user.findUnique({
            where: { id },
        });
    };
    create = async (data) => {
        return prisma.user.create({
            data,
        });
    };
    updateProfile = async (id, data) => {
        return prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
            },
        });
    };
    updatePassword = async (id, password) => {
        return prisma.user.update({
            where: { id },
            data: { password },
        });
    };
}
