import { UserRepository } from '../repositories/userRepository';
import { Hash } from '../utils/hash';
import { AppError } from '../utils/appError';
export class UserService {
    userRepository = new UserRepository();
    updateProfile = async (userId, data) => {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new AppError('Usuário não encontrado.', 404);
        }
        if (data.email) {
            const existingUser = await this.userRepository.findByEmail(data.email);
            if (existingUser && existingUser.id !== userId) {
                throw new AppError('Email já está em uso.', 409);
            }
        }
        return this.userRepository.updateProfile(userId, data);
    };
    changePassword = async (userId, currentPassword, newPassword) => {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new AppError('Usuário não encontrado.', 404);
        }
        const passwordMatch = await Hash.compare(currentPassword, user.password);
        if (!passwordMatch) {
            throw new AppError('Senha atual incorreta.', 401);
        }
        const hashedPassword = await Hash.generate(newPassword);
        await this.userRepository.updatePassword(userId, hashedPassword);
    };
}
