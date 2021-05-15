import * as express from 'express';
import customerRouter from './app/routers/customer.route';
import orderRouter from './app/routers/order.route';
import productRoute from './app/routers/product.route';

const app = express();

// parse application/json
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/api', customerRouter);
app.use('/api', orderRouter);
app.use('/api', productRoute);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
