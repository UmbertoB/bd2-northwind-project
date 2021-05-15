import { Router } from 'express';
import CustomerController from '../controllers/customer.controller';

const customerRouter = Router();

customerRouter.get('/all', CustomerController.findAllCustumers);

customerRouter.get('/', CustomerController.findAllCustomersPaginated);

customerRouter.post('/', CustomerController.createCustomer);

customerRouter.put('/:customerId', CustomerController.updateCustomer);

customerRouter.delete('/:customerId', CustomerController.deleteCustomer);

export default Router().use('/customer', customerRouter);
