import { ORDERS } from './types';
import { Order } from '@api-interfaces';
import { getOrdersApi, getOrderProductsApi } from '../../api/order.api';

function request() {
	return {
		type: ORDERS.INIT
	};
}

function success(data) {
	return {
		type: ORDERS.SUCCESS,
		payload: data
	};
}


function error(error: string) {
	return {
		type: ORDERS.ERROR,
		payload: error
	};
}

function create_init() {
	return {
		type: ORDERS.CREATE_INIT,
	}
}

function create_success() {
	return {
		type: ORDERS.CREATE_SUCCESS,
	}
}

function create_error(error: string) {
	return {
		type: ORDERS.CREATE_ERROR,
		payload: error
	}
}

export function resetData() {
	return {
		type: ORDERS.RESET_DATA,
	};
}

export function createOrder(customer: Order, history: { push: (path: string) => void }) {
	return async function (dispatch: any) {
		dispatch(create_init());
		try {
			// await createCustomerApi(customer);
			history.push('/customer');
			dispatch(create_success())
		} catch (err) {
			dispatch(create_error(err.response.data));
		}
	};
}

export function getOrders(page = 1, search = '', dateFrom = '', dateTo = '') {
	return async function (dispatch: any) {
		dispatch(request());
		try {
			const response = await getOrdersApi(page, search, dateFrom, dateTo);
			dispatch(success(response))
		} catch (err) {
			dispatch(error(err.response.data));
		}
	};
}

export function openOrderDetail(o: Order, history: { push: (path: string) => void }) {
	history.push('/order/detail');
	return {
		type: ORDERS.OPEN_DETAIL,
		payload: o
	}
}
