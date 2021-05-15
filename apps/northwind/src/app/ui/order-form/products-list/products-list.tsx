import React, { useEffect, useState } from 'react';
import { getOrderProductsApi } from '../../../api/order.api';
import { Container, ProductItem } from '../../../components/containers';
import useOrder from '../../../hooks/useOrder';

export const ProductsList = () => {
  const { orderDetail } = useOrder();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (orderDetail) {
      getOrderProductsApi(orderDetail.OrderID)
        .then(response => {
          setProductList(response)
        });
    }

    // return () => resetEditData()
  }, []);
  
  let totalPrice = 0;

  return (
    <Container style={{ marginBottom: '25px' }}>
      {productList &&
        productList.map((op) => {
          
          const productPrice = op.Discount > 0 ? +(
            op.Quantity * op.UnitPrice * (1 - op.Discount)
          ).toFixed(2) : +(op.Quantity * op.UnitPrice).toFixed(2)
          totalPrice += productPrice;

          return (
            <ProductItem key={op.ProductID}>
              <p className="product-name">{op.ProductName}</p>
              <p className="product-quantity">
                x{op.Quantity} (Unidade:R${op.UnitPrice.toFixed(2)})
              </p>
              {op.Discount > 0 && (
                <p className="product-price">
                  R${productPrice} (desconto de {100 * op.Discount.toFixed(2)}%)
                </p>
              )}
              {op.Discount === 0 && (
                <p className="product-price">
                  R${productPrice}
                </p>
              )}
            </ProductItem>
          );
        })}
      <ProductItem style={{ borderTop: '2px solid black'}}>
        <p className="product-total">TOTAL</p>
        <p className="product-price">
          R${totalPrice.toFixed(2)}
        </p>
      </ProductItem>
    </Container>
  );
};

export default ProductsList;
