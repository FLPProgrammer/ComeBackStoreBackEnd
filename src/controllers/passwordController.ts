import { Request, Response } from 'express';
import { PasswordService } from '../services/passwordService';

export class PasswordController {
   constructor(private PasswordService: PasswordService) {}


    async forgot(request: Request, response: Response) {
        const { email } = request.body;

        await this.PasswordService.requestReset(email);

        return response.json({
            message: "Se o email existir, você receberá as instruções.",
        });

    }

    async reset(request: Request, response: Response) {
        const { token, password } = request.body;

        await this.PasswordService.resetPassword(token,password);

        return response.json({ message: 'Senha alterada com sucesso'});
    }
}