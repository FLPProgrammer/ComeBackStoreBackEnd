import rateLimit from 'express-rate-limit';
export const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // 5 tentativas por IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: 'Muitas tentativas de login. Tente novamente mais tarde.',
    },
});
