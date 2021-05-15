import styled from "styled-components";

export const Container = styled.div`
    margin: 0 auto 75px auto;
    max-width: 900px;
`

export const ListActionsHeader = styled.div`
  border-radius: 0 0 20px 20px;
  background: white;
  margin-top: 2px;
  padding: 15px;
  margin-bottom: 25px;

  display: flex;

  a {
    margin-left: auto;
  }
`;

export const Row = styled.div`
    padding: 10px 25px;
    border-radius: 2px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.24);
    border: solid 1px #fef8f8;
    background-color: #ffffff;
    margin: 10px 35px;
    display: flex;
`;

export const ProductItem = styled(Row)`
  background-color: #ffffff;
  margin: 0 60px;
  font-size: 14px;
  padding: 10px 15px;
  flex-wrap: wrap;

  .product-name,
  .product-total {
    text-transform: capitalize;
    font-weight: 600;
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
  }

  .product-total {
    font-size: 13px;
    letter-spacing: 0.2px;
  }

  .product-quantity {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .product-price {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .quantity-block {
    border: 1px solid #bdbdbd;
    margin: 0 10px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 24%);
    padding: 5px;
  }
`;

export const FormCard = styled.div`
  margin-top: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 20px;

  form {
    text-align: center;
  }

  .title {
    margin-bottom: 25px;
  }

  .inputs {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row;
    row-gap: 25px;
    column-gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }

  .submit-btn {
    margin-left: 10px;
  }
`;
