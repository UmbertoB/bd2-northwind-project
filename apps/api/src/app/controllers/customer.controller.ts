import { Request, Response } from "express";
import database from "../../database/db";
import { Customer, CustomerDTO } from "@api-interfaces";

export default class CustomerController {

    static async findAllCustumers(req: Request, res: Response) {

        const products = await database
            .select('*')
            .from('Customers')

        res.json(products);
    }  

    static async findAllCustomersPaginated(req: Request, res: Response) {
        const { q: search, p: page } = req.query as { q: string, p: string };
        const pageLimit = 8;

        const customersSql = database
            .select('*')
            .from('Customers')
            .offset(pageLimit * (+page - 1))
            .limit(pageLimit)
            .orderBy('CompanyName', 'desc');

        const countSql = database('Customers').count('*', { as: 'count' });
        
        if (search) {
            customersSql.where('CompanyName', 'like', `%${search}%`);
            countSql.where('CompanyName', 'like', `%${search}%`);
        }

        const [{ count }] = await countSql;

        const dto: CustomerDTO = {
            data: await customersSql,
            metadata: { 
                page: page, 
                search,
                totalPages: Math.ceil(+count / pageLimit)
            }
        };

        res.json(dto);
    }

    static async createCustomer(req: Request, res: Response) {
        const newCustomer = req.body as Customer;
        try {
            await database.insert(newCustomer).into('Customers');
        } catch(e) {
            res.status(400).json(e);
        }
        res.status(201).json(newCustomer);
    }  

    static async updateCustomer(req: Request, res: Response) {
        const { customerId } = req.params as { customerId: string };
        const updatedClient = req.body as Customer;

        await database('Customers')
                .where('CustomerID', '=', customerId)
                .update(updatedClient);

        res.json(updatedClient);

    }

    static async deleteCustomer(req: Request, res: Response) {
        const { customerId } = req.params as { customerId: string };

        await database.delete().from('Customers').where('CustomerID', '=', customerId);

        res.json({ customerId: customerId });
    }


}