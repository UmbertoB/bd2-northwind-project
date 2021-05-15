import { ListMetadata } from "./common-interfaces";

export interface Customer {
    CustomerID?: string;
    CompanyName: string;
    ContactName: string;
    ContactTitle: string;
    Address: string;
    City: string;
    Region: string;
    PostalCode: string;
    Country: string;
    Phone: string;
    Fax: string;
}


export interface CustomerDTO {
    data: Customer[];
    metadata: ListMetadata
}