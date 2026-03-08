import { CheckoutService } from '../services/checkoutService';
export class CheckoutController {
    checkoutService = new CheckoutService();
    async create(request, response) {
        const { items } = request.body;
        const checkoutUrl = await this.checkoutService.createSession(items);
        return response.json({ url: checkoutUrl });
    }
}
