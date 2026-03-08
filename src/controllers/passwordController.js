export class PasswordController {
    PasswordService;
    constructor(PasswordService) {
        this.PasswordService = PasswordService;
    }
    async forgot(request, response) {
        const { email } = request.body;
        await this.PasswordService.requestReset(email);
        return response.json({
            message: "Se o email existir, você receberá as instruções.",
        });
    }
    async reset(request, response) {
        const { token, password } = request.body;
        await this.PasswordService.resetPassword(token, password);
        return response.json({ message: 'Senha alterada com sucesso' });
    }
}
