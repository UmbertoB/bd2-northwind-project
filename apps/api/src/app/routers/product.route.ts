import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const productRouter = Router();

productRouter.get('/', ProductController.findAllProducts);

export default Router().use('/product', productRouter);
