import { CUSTOMERS } from './types';
import { createCustomerApi, getCustomersApi, deleteCustomerApi, updateCustomerApi } from '../../api/customers.api';
import { Customer } from '@api-interfaces';

function request() {
	return {
		type: CUSTOMERS.INIT
	};
}

function success(data) {
	return {
		type: CUSTOMERS.SUCCESS,
		payload: data
	};
}

function error(error: string) {
	return {
		type: CUSTOMERS.ERROR,
		payload: error
	};
}

function deleted(customerId: string) {
	return {
		type: CUSTOMERS.DELETED,
		payload: customerId
	}
}

function create_init() {
	return {
		type: CUSTOMERS.CREATE_INIT,
	}
}

function create_success() {
	return {
		type: CUSTOMERS.CREATE_SUCCESS,
	}
}

function create_error(error: string) {
	return {
		type: CUSTOMERS.CREATE_ERROR,
		payload: error
	}
}

function update_init() {
	return {
		type: CUSTOMERS.UPDATE_INIT,
	}
}

function update_success() {
	return {
		type: CUSTOMERS.UPDATE_SUCCESS,
	}
}

function update_error(error: string) {
	return {
		type: CUSTOMERS.UPDATE_ERROR,
		payload: error
	}
}

export function resetData() {
	return {
		type: CUSTOMERS.RESET_DATA,
	};
}

export function resetEditData() {
	return {
		type: CUSTOMERS.RESET_EDIT_DATA,
	};
}

export function createCustomer(customer: Customer, history: { push: (path: string) => void }) {
	return async function (dispatch: any) {
		dispatch(create_init());
		try {
			await createCustomerApi(customer);
			history.push('/customer');
			dispatch(create_success())
		} catch (err) {
			dispatch(create_error(err.response.data));
		}
	};
}

export function getCustomers(page = 1, search = '') {
	return async function (dispatch: any) {
		dispatch(request());
		try {
			const response = await getCustomersApi(page, search);
			dispatch(success(response))
		} catch (err) {
			dispatch(error(err.response.data));
		}
	};
}

export function updateCustomer(customer: Customer, history: { push: (path: string) => void }) {
	return async function (dispatch: any) {
		dispatch(update_init());
		try {
			await updateCustomerApi(customer);
			history.push('/customer');
			dispatch(update_success())
		} catch (err) {
			dispatch(update_error(err.response.data));
		}
	};
}

export function deleteCustomer(customerId: string) {
	return async function (dispatch: any) {
		try {
			await deleteCustomerApi(customerId);
			dispatch(deleted(customerId))
		} catch(err) {
			dispatch(error(err.response.data))
		}
	}
}

export function openUpdateCustomer(customer: Customer, history: { push: (path: string) => void }) {
	history.push('/customer/update');
	return {
		type: CUSTOMERS.OPEN_UPDATE,
		payload: customer
	}
}
