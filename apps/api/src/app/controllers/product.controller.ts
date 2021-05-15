import { Request, Response } from "express";
import database from "../../database/db";

export default class ProductController {

    static async findAllProducts(req: Request, res: Response) {

        const products = await database
            .select('*')
            .from('Products')

        res.json(products);
    }  

}