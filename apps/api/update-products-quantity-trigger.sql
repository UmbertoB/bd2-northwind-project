CREATE TRIGGER updateProductsQuantity
ON [Order Details]
AFTER INSERT
AS 
BEGIN

UPDATE p
   SET UnitsInStock = UnitsInStock - i.Quantity
   FROM Products p
   JOIN (SELECT ProductID, SUM(Quantity) AS Quantity FROM INSERTED GROUP BY ProductID) i ON p.ProductID = i.ProductID
END;