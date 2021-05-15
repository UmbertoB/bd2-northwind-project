import React, { useEffect, useState } from 'react';
import { Container, ProductItem, FormCard } from '../../components/containers';
import { Button, GhostButton, InputBlock } from '../../components/input';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Customer } from '@api-interfaces';
import { getAllCustomersApi } from '../../api/customers.api';
import { Product } from '@api-interfaces';
import { getProductsApi } from '../../api/product.api';
import { IconButton } from '../../components/input';
import { createOrderApi } from '../../api/order.api';


export const CreateOrderForm = withRouter(({ history }) => {
  const [customers, setCustomers] = useState([] as Customer[]);
  const [products, setProducts] = useState([] as Product[]);
  const [selectedCustomer, setSelectedCustomer] = useState('');

  useEffect(() => {
    getProductsApi().then((response) => {
      setProducts(response.map((r) => ({ ...r, Quantity: 0 })));
    });

    getAllCustomersApi().then((response) => {
      setCustomers(response);
    });

    // return () => clearProductsList()
  }, []);

  const changeSelectedCustomer = (e) => {
    setSelectedCustomer(e.target.value);
  };

  const changeProductQuantity = (p: Product, quantity: number) => () => {
    const productIndex = products.findIndex(
      (prod) => prod.ProductID === p.ProductID
    );
    const items = [...products];
    const item = { ...items[productIndex] };
    item.Quantity += quantity;
    item.UnitsInStock -= quantity;
    items[productIndex] = item;
    setProducts(items);
  };

  let totalValue = 0;
  products.forEach((p) => {
    totalValue += p.Quantity * p.UnitPrice;
  });

  const submit = (e) => {
    e.preventDefault()

    if (selectedCustomer) {
      createOrderApi({ CustomerID: selectedCustomer, products: products.filter((p) => p.Quantity > 0) }).then(() => {
        history.push('/order')
      });
    }

  };

  return (
    <Container>
      <FormCard>
        <form onSubmit={submit}>
          <h1 className="title">Adicionar Compra</h1>
          <div className="inputs">
            <InputBlock>
              <label>Cliente</label>
              <select style={{ width: '300px' }} onChange={changeSelectedCustomer} value={selectedCustomer}>
                  <option value="">
                  </option>
                {customers.map((c) => (
                  <option key={c.CustomerID} value={c.CustomerID}>
                    {c.CompanyName}
                  </option>
                ))}
             </select>
            </InputBlock>
          </div>

          <Container style={{ marginBottom: '25px' }}>
            {products &&
              products.map((p) => {
                return (
                  <ProductItem key={p.ProductID}>
                    <p className="product-name">
                      {p.ProductName}
                      {p.UnitsInStock <= 0 && 
                      <small style={{ color: '#9a3d3d' }}>- Produto Esgotado!</small>}
                      {p.UnitsInStock > 0 && p.UnitsInStock <= 10 && 
                      <small style={{ color: '#9a973d'  }}>- Últimas Unidades!</small>}
                    </p>
                    <div className="product-price">
                      <IconButton
                        type="button"
                        onClick={changeProductQuantity(p, -1)}
                        disabled={p.Quantity <= 0}
                        style={{ backgroundColor: '#9a3d3d', marginRight: 0 }}
                      >
                        -
                      </IconButton>
                      <div className="quantity-block">{p.Quantity}</div>
                      <IconButton
                        type="button"
                        onClick={changeProductQuantity(p, 1)}
                        style={{ backgroundColor: '#3d659a' }}
                        disabled={p.UnitsInStock <= 0}
                      >
                        +
                      </IconButton>
                    </div>
                  </ProductItem>
                );
              })}
            <ProductItem style={{ borderTop: '2px solid black' }}>
              <p className="product-total">TOTAL</p>
              <p className="product-price">R$ {totalValue.toFixed(2)}</p>
            </ProductItem>
          </Container>
          <Link to="/order">
            <GhostButton type="button">Voltar</GhostButton>
          </Link>
          <Button className="submit-btn" type="submit">
            Adicionar
          </Button>
        </form>
      </FormCard>
    </Container>
  );
});

export default CreateOrderForm;
