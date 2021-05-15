create procedure ordersRange
    @dateFrom date,
    @dateTo date,
    @offset int,
    @limit int
as
    SELECT *
    FROM Orders o
    JOIN Customers c ON o.CustomerID = c.CustomerID
    WHERE OrderDate BETWEEN @dateFrom AND @dateTo
    ORDER BY o.OrderDate
    OFFSET @offset ROWS 
    FETCH NEXT @limit ROWS ONLY

