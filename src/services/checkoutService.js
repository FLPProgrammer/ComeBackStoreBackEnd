import { stripe } from '../config/stripe';
import { AppError } from '../utils/appError';
export class CheckoutService {
    async createSession(items) {
        if (!items || items.length === 0) {
            throw new AppError('Carrinho vazio.', 400);
        }
        const lineItems = items.map(item => ({
            price_data: {
                currency: 'brl',
                product_data: {
                    name: item.title,
                },
                unit_amount: Math.round(Number(item.price.replace(',', '.')) * 100),
            },
            quantity: item.quantity,
        }));
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            success_url: `${process.env.FRONTEND_URL}/checkout/success`,
            cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel`,
        });
        return session.url;
    }
}
