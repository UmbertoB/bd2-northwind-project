import { Request, Response } from "express";
import database from "../../database/db";
import { CreateOrderDTO, Customer, OrderDTO } from "@api-interfaces";

export default class OrderController {
    
    static async findAllOrders(req: Request, res: Response) {
        const { q: search, p: page, dateFrom, dateTo } = req.query as { q: string, p: string, dateFrom: string, dateTo: string };
        const pageLimit = 8;
        
        let customersSql, countSql;
        if (dateFrom && dateTo) {
            customersSql = database.raw(`EXEC ordersRange @dateFrom="${dateFrom}", @dateTo="${dateTo}", @offset="${pageLimit * (+page - 1)}", @limit="${pageLimit}"`)
            countSql = database.raw(`EXEC ordersRangeCount @dateFrom="${dateFrom}", @dateTo="${dateTo}"`)
        } else {
            customersSql = database
            .select('*')
            .from('Orders')
            .join('Customers', 'Customers.CustomerID', 'Orders.CustomerID')
            .offset(pageLimit * (+page - 1))
            .limit(pageLimit)
            .orderBy('OrderDate', 'desc');
            countSql = database('Orders').count('*', { as: 'count' });
        }
        
        
        if (search && (!dateFrom && !dateTo)) {
            customersSql.where('Customers.CompanyName', 'like', `%${search}%`);
            countSql.join('Customers', 'Customers.CustomerID', 'Orders.CustomerID').where('Customers.CompanyName', 'like', `%${search}%`);
        }

        const [{ count }] = await countSql;

        const dto: OrderDTO = {
            data: await customersSql,
            metadata: { 
                page: page, 
                search,
                totalPages: Math.ceil(+count / pageLimit)
            }
        };

        res.json(dto);
    }

    static async getOrderDetail(req: Request, res: Response) {
        const { orderId } = req.params;

        const customersSql = await database
            .select(['Order Details.*', 'Products.ProductName'])
            .from('Order Details')
            .join('Products', 'Order Details.ProductID', 'Products.ProductID')
            .where('OrderID', '=', orderId);
        
        res.json(customersSql);
    }

    static async createOrder(req: Request, res: Response) {
        const { CustomerID, products } = req.body as CreateOrderDTO;

        const order = {
            "CustomerID": CustomerID,
            "EmployeeID": 5,
            "OrderDate": new Date(),
            "RequiredDate": "1996-08-01T00:00:00",
            "ShippedDate": "1996-07-16T00:00:00",
            "ShipVia": 3,
            "Freight": 32.3800,
            "ShipName": "Vins et alcools Chevalier",
            "ShipAddress": "59 rue de l'Abbaye",
            "ShipCity": "Reims",
            "ShipRegion": null,
            "ShipPostalCode": "51100",
            "ShipCountry": "France"
        }

        const [OrderID] = await database.insert(order).returning('OrderID').into('Orders');

        const orderDetails = products.map((p) => ({
            OrderID,
            ProductID: p.ProductID,
            UnitPrice: p.UnitPrice,
            Quantity: p.Quantity,
            Discount: 0,
        }));


        await database.insert(orderDetails).into('Order Details');

        res.status(201).json(OrderID);
    }

    static async topCustomersInCategory(req: Request, res: Response) {
        const top3 = await database.raw('EXEC top3ClientesCategoria @category="Seafood"');
        res.json(top3)
    } 

}