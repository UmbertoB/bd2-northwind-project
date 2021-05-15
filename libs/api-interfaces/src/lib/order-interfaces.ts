import { ListMetadata } from "./common-interfaces";
import { Product } from "./product-interfaces";

export interface Order {
    [param: string]: any
}

export interface OrderDTO {
    data: Order[];
    metadata: ListMetadata
}

export interface CreateOrderDTO {
    CustomerID: string,
    products: Product[],
}