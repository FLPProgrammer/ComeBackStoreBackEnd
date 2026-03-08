import { Token } from '../utils/jwt';
export function ensureAuthenticated(request, response, next) {
    const token = request.cookies.token;
    if (!token) {
        return response.status(401).json({ message: 'Token não encontrado.' });
    }
    try {
        const decoded = Token.verify(token);
        request.userId = decoded.userId;
        return next();
    }
    catch {
        return response.status(401).json({ message: 'Token inválido!' });
    }
}
