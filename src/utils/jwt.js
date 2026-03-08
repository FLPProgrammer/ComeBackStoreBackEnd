import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
export class Token {
    static generate(payload) {
        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: "1d",
        });
    }
    static verify(token) {
        return jwt.verify(token, JWT_SECRET);
    }
}
