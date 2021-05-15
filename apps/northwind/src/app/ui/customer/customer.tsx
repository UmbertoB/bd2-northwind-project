import React, { useEffect, useRef, useState } from 'react';
import { Customer } from '@api-interfaces';
import { Container, ListActionsHeader, Row } from '../../components/containers';
import { Button, IconButton, InputBlock } from '../../components/input';
import debounce from '../../utils/debounce.utils';
import { Link, withRouter } from 'react-router-dom';
import useCustomers from '../../hooks/useCustomer';
import editSvg from '../../../assets/icons/edit.svg';
import deleteSvg from '../../../assets/icons/delete.svg';

export const Customers = withRouter(({ history }) => {
  const {
    getCustomers,
    deleteCustomer,
    openUpdateCustomer,
    resetData,
    data: customers,
    metadata,
  } = useCustomers();

  const [search, setSearchCustomers] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCustomers(page, search);

    return () => {
      resetData();
    };
  }, []);

  const searchCustomerInput = (e) => {
    resetData();
    setPage(1);
    setSearchCustomers(e.target.value);
    getCustomers(1, e.target.value);
  };

  const setPageButton = (page: number) => {
    setPage(page);
    getCustomers(page, search);
  };

  const deleteCustomerButton = (c: Customer) => () =>
    deleteCustomer(c.CustomerID);

  const updateCustomerButton = (c: Customer) => () =>
    openUpdateCustomer(c, history);

  return (
    <Container>
      <ListActionsHeader>
        <InputBlock style={{ marginRight: '7.5px' }}>
          <input
            placeholder="Buscar cliente"
            onChange={debounce(searchCustomerInput, 600)}
            style={{ width: '150' }}
          />
        </InputBlock>
        <Link to="/customer/create">
          <Button>Adicionar Cliente</Button>
        </Link>
      </ListActionsHeader>
      {customers &&
        customers.map((c) => (
          <Row key={c.CompanyName}>
            <div className="customer-row">
              <h1>{c.CompanyName}</h1>
              <p>
                {c.Address} - {c.Country}
              </p>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <IconButton
                onClick={updateCustomerButton(c)}
                style={{ backgroundColor: '#3d659a' }}
              >
                <img src={editSvg} alt="edit" />
              </IconButton>
              <IconButton
                onClick={deleteCustomerButton(c)}
                style={{ backgroundColor: '#9a3d3d' }}
              >
                <img src={deleteSvg} alt="delete" />
              </IconButton>
            </div>
          </Row>
        ))}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {metadata && metadata.totalPages !== page && metadata.totalPages !== 0 && (
            <Button onClick={() => setPageButton(page + 1)} style={{ fontWeight: 600, fontSize: '12px' }}>MOSTRAR MAIS</Button>
          )}
        </div>
    </Container>
  );
});

export default Customers;
