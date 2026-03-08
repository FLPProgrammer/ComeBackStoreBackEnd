import { Router } from 'express';
import { PasswordController } from '../controllers/passwordController';
import { PasswordService } from '../services/passwordService';

export const passwordRoutes = Router();


const passwordService = new PasswordService();
const passwordController = new PasswordController(passwordService);

passwordRoutes.post('/forgot-password', passwordController.forgot.bind(passwordController))
passwordRoutes.post('/reset-password', passwordController.reset.bind(passwordController));