import { Router } from 'express';
import { CheckoutController } from '../controllers/checkoutController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
export const checkoutRoutes = Router();
const checkoutController = new CheckoutController();
checkoutRoutes.post('/', ensureAuthenticated, checkoutController.create.bind(checkoutController));
