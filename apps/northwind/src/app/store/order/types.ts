import { ListMetadata, Order } from '@api-interfaces';

export interface IOrder {
	data: Order[];
	metadata: ListMetadata;
	isLoading: boolean;
	error: string;
	orderDetail: Order;
}

export enum ORDERS {
	RESET_DATA = 'ORDERS_RESET_DATA',

	INIT = 'ORDERS_INIT',
	SUCCESS = 'ORDERS_SUCCESS',
	ERROR = 'ORDERS_ERROR',

	CREATE_INIT = 'ORDERS_CREATE_INIT',
	CREATE_SUCCESS = 'ORDERS_CREATE_SUCCESS',
	CREATE_ERROR = 'ORDERS_CREATE_ERROR',

	OPEN_DETAIL = 'ORDERS_OPEN_DETAIL',

}