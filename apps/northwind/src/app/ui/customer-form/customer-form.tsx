import React, { useEffect, useState } from 'react';
import { Container, FormCard } from '../../components/containers';
import { Button, GhostButton, InputBlock } from '../../components/input';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Customer } from '@api-interfaces';
import useForms from '../../hooks/useForms';
import useCustomers from '../../hooks/useCustomer';

export const CustomerForm = withRouter(({ history }) => {
  const { createCustomer, updateCustomer, resetEditData, customerOnEdition } = useCustomers();

  const isEditing = !!customerOnEdition;
  useEffect(() => {
    if (history.location.pathname.includes('/update') && !customerOnEdition) {
      history.push('/customer');
    } 

    return () => resetEditData()
  }, [])

  const submit = () => {
    if (isEditing) {
      updateCustomer(inputs, history);
    } else {
      createCustomer(inputs, history);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForms<Customer>(
    {
      CustomerID: customerOnEdition?.CustomerID || '',
      CompanyName: customerOnEdition?.CompanyName || '',
      ContactName: customerOnEdition?.ContactName || '',
      ContactTitle: customerOnEdition?.ContactTitle || '',
      Region: customerOnEdition?.Region || '',
      Address: customerOnEdition?.Address || '',
      City: customerOnEdition?.City || '',
      PostalCode: customerOnEdition?.PostalCode || '',
      Country: customerOnEdition?.Country || '',
      Phone: customerOnEdition?.Phone || '',
      Fax: customerOnEdition?.Fax || '',
    },
    submit
  );

  return (
    <Container>
      <FormCard>
        <form onSubmit={handleSubmit}>
          <h1 className="title">{customerOnEdition ? 'Atualizar' : 'Adicionar'} Cliente</h1>  
          <div className="inputs">
          <InputBlock>
              <label>Identificador</label>
              <input
                placeholder="Identificador"
                name="CustomerID"
                onChange={handleInputChange}
                value={inputs?.CustomerID}
                maxLength={5}
              />
            </InputBlock>
            <InputBlock>
              <label>Nome</label>
              <input
                placeholder="Nome"
                name="CompanyName"
                onChange={handleInputChange}
                value={inputs?.CompanyName}
              />
            </InputBlock>

            <InputBlock>
              <label>Nome do Contato</label>
              <input
                placeholder="Nome do Contato"
                name="ContactName"
                onChange={handleInputChange}
                value={inputs.ContactName}
              />
            </InputBlock>

            <InputBlock>
              <label>Cargo do Contato</label>
              <input
                placeholder="Cargo do Contato"
                name="ContactTitle"
                onChange={handleInputChange}
                value={inputs.ContactTitle}
              />
            </InputBlock>

            <InputBlock>
              <label>Endereço</label>
              <input
                placeholder="Endereço"
                name="Address"
                onChange={handleInputChange}
                value={inputs.Address}
              />
            </InputBlock>

            <InputBlock>
              <label>Cidade</label>
              <input
                placeholder="Cidade"
                name="City"
                onChange={handleInputChange}
                value={inputs.City}
              />
            </InputBlock>

            <InputBlock>
              <label>Código Postal</label>
              <input
                placeholder="Código Postal"
                name="PostalCode"
                onChange={handleInputChange}
                value={inputs.PostalCode}
              />
            </InputBlock>

            <InputBlock>
              <label>País</label>
              <input
                placeholder="País"
                name="Country"
                onChange={handleInputChange}
                value={inputs.Country}
              />
            </InputBlock>

            <InputBlock>
              <label>Telefone</label>
              <input
                placeholder="Telefone"
                name="Phone"
                onChange={handleInputChange}
                value={inputs.Phone}
              />
            </InputBlock>

            <InputBlock>
              <label>Fax</label>
              <input
                placeholder="Fax"
                name="Fax"
                onChange={handleInputChange}
                value={inputs.Fax}
              />
            </InputBlock>
          </div>
          <Link to="/customer">
            <GhostButton type="button">Voltar</GhostButton>
          </Link>
          <Button className="submit-btn" type="submit">
            {customerOnEdition ? 'Atualizar' : 'Adicionar'}
          </Button>
        </form>
      </FormCard>
    </Container>
  );
});

export default CustomerForm;
