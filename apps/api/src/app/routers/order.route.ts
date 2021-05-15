import { Router } from 'express';
import OrderController from '../controllers/order.controller';

const orderRouter = Router();

orderRouter.get('/', OrderController.findAllOrders);

orderRouter.get('/by-category', OrderController.topCustomersInCategory);

orderRouter.get('/:orderId', OrderController.getOrderDetail);

orderRouter.post('/', OrderController.createOrder);



export default Router().use('/order', orderRouter);
