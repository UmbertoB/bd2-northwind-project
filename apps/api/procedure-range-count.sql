create procedure ordersRangeCount
    @dateFrom date,
    @dateTo date
as
    SELECT count(*) as count
    FROM Orders o
    WHERE OrderDate BETWEEN @dateFrom AND @dateTo

