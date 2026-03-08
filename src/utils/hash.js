import bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;
export const Hash = {
    async generate(value) {
        return bcrypt.hash(value, SALT_ROUNDS);
    },
    async compare(value, hash) {
        return bcrypt.compare(value, hash);
    },
};
