import React, { useEffect, useState } from 'react';
import { Navbar, Link } from './components/navbar';
import GlobalStyle from './components/global';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Customers from './ui/customer/customer';
import CustomerForm from './ui/customer-form/customer-form';
import Orders from './ui/order/order';
import OrderForm from './ui/order-form/order-form';
import CreateOrderForm from './ui/order-form/create-order-form';

export const App = () => {

  return (
    <Router>
      <GlobalStyle />
      <Navbar>
        <div className="logo-wrapper">
          <img src="assets/images/northwind-traders.jpeg" alt="logo" />
        </div>
        <div className="nav-links">
            <Link to="/customer" activeClassName="selected">
              Clientes
            </Link>
            <Link to="/order" activeClassName="selected">
              Compras
            </Link>
        </div>
      </Navbar>
      <Switch>
        <Route exact path="/customer/" component={Customers} />
        <Route path="/customer/create" component={CustomerForm} />
        <Route path="/customer/update" component={CustomerForm} />
        <Route exact path="/order" component={Orders} />
        <Route path="/order/detail" component={OrderForm} />
        <Route path="/order/create" component={CreateOrderForm} />
      </Switch>
    </Router>
  );
};

export default App;
