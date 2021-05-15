import React, { useEffect, useState } from 'react';
import { Container, FormCard } from '../../components/containers';
import { GhostButton, InputBlock } from '../../components/input';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Customer } from '@api-interfaces';
import useForms from '../../hooks/useForms';
import useOrder from '../../hooks/useOrder';
import ProductsList from './products-list/products-list';
import { getAllCustomersApi } from '../../api/customers.api';

export const OrderForm = withRouter(({ history }) => {
  const { orderDetail } = useOrder();
  const checkingOrderDetail = orderDetail && Object.keys(orderDetail).length > 0;
  const [customers, setCustomers] = useState([] as Customer[]);

  useEffect(() => {
    if (!checkingOrderDetail) {
      getAllCustomersApi().then(response => {
        setCustomers(response)
      });
    }
  }, []);

  const submit = () => {
    // createCustomer(inputs, history);
  };

  const { inputs, handleInputChange, handleSubmit } = useForms<Customer>(
    {
      CustomerID: orderDetail?.CustomerID || undefined,
      CompanyName: orderDetail?.CompanyName || undefined,
      ContactName: orderDetail?.ContactName || undefined,
      ContactTitle: orderDetail?.ContactTitle || undefined,
      Region: orderDetail?.Region || undefined,
      Address: orderDetail?.Address || undefined,
      City: orderDetail?.City || undefined,
      PostalCode: orderDetail?.PostalCode || undefined,
      Country: orderDetail?.Country || undefined,
      Phone: orderDetail?.Phone || undefined,
      Fax: orderDetail?.Fax || undefined,
    },
    submit
  );

  return (
    <Container>
      <FormCard>
        <form onSubmit={handleSubmit}>
          <h1 className="title">
            Detalhes da Compra
          </h1>
          <div className="inputs">
            <InputBlock>
              <label>Cliente</label>
              <input
                style={{ width: '300px' }} 
                placeholder="Identificador"
                name="CustomerID"
                onChange={handleInputChange}
                value={inputs?.CompanyName}
                disabled={checkingOrderDetail}
              />
            </InputBlock>

          </div>

          <ProductsList />

          <Link to="/order">
            <GhostButton type="button">Voltar</GhostButton>
          </Link>
        </form>
      </FormCard>
    </Container>
  );
});

export default OrderForm;
