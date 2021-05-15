import React, { useEffect, useRef, useState } from 'react';
import { Customer, Order } from '@api-interfaces';
import { Container, ListActionsHeader, Row } from '../../components/containers';
import { Button, GhostButton, IconButton, InputBlock } from '../../components/input';
import debounce from '../../utils/debounce.utils';
import { Link, withRouter } from 'react-router-dom';
import useOrder from '../../hooks/useOrder';
import detailSvg from '../../../assets/icons/detail.svg';
import formatDate from '../../utils/date-formatter.utils';
import formatDateDatabase from '../../utils/date-formatter-database.utils';

export const Orders = withRouter(({ history }) => {
  const {
    getOrders,
    resetData,
    openOrderDetail,
    data: orders,
    metadata,
  } = useOrder();

  const [search, setSearchCustomers] = useState('');
  const [dateFrom, setDateFROM] = useState('' as string);
  const [dateTo, setDateTO] = useState('' as string);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getOrders(page, search);

    return () => {
      resetData();
    };
  }, []);

  const searchCustomerInput = (e) => {
    resetData();
    setPage(1);
    setSearchCustomers(e.target.value);
    getOrders(1, e.target.value);
  };

  const setDate = (type: 'FROM' | 'TO') => (e) => {
    let dateFROM = dateFrom;
    let dateTO = dateTo;
    if (type === 'FROM') {
      dateFROM = e.target.value;
      setDateFROM(dateFROM);
    } else {
      dateTO = e.target.value;
      setDateTO(dateTO);
    }

    if (dateFROM && dateTO) {
      resetData();
      setPage(1);
      getOrders(1, search, dateFROM, dateTO);
    }
  };

  const clearFilters = () => {
    resetData();
    setDateFROM('');
    setDateTO('');
    setPage(1);
    setSearchCustomers('');
    getOrders(1, '', '', '');
  }

  const setPageButton = (page: number) => {
    setPage(page);
    getOrders(page, search, dateFrom, dateTo);
  };

  const openDetailButton = (o: Order) => () =>
    openOrderDetail(o, history);

  return (
    <Container>
      <ListActionsHeader>
        <InputBlock style={{ marginRight: '7.5px'}}>
          <input
            placeholder="Buscar compra pelo cliente"
            onChange={debounce(searchCustomerInput, 600)}
            disabled={!!dateFrom && !!dateTo}
          />
        </InputBlock>
        <InputBlock style={{ marginRight: '7.5px'}}>
          <input
            type="date"
            placeholder="Data DE"
            value={dateFrom}
            onChange={setDate('FROM')}
          />
        </InputBlock>
        <InputBlock style={{ marginRight: '7.5px'}}>
          <input
            type="date"
            placeholder="Data PARA"
            value={dateTo}
            onChange={setDate('TO')}
          />
        </InputBlock>
        {(search || (dateFrom && dateTo)) && 
        <GhostButton onClick={clearFilters}>
          Limpar
        </GhostButton>}
        <Link to="/order/create">
          <Button>Adicionar Compra</Button>
        </Link>
      </ListActionsHeader>
      {orders &&
        orders.map((o) => (
          <Row key={o.OrderID}>
            <div className="order-row">
              <h1>{formatDate(o.OrderDate)}</h1>
              <p>
                <strong>Cliente </strong>{o.CompanyName}
              </p>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <IconButton onClick={openDetailButton(o)}>
                <img src={detailSvg} alt="edit" />
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

export default Orders;
