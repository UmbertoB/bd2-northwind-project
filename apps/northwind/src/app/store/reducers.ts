import { ICustomer } from './customer/types';
import customerReducer from './customer';
import orderReducer from './order';
import { logger } from './middlewares';
import { IOrder } from './order/types';

export interface IState {
	customer: ICustomer;
	order: IOrder;
}

export const initialState: IState = {
	customer: customerReducer.initialState,
	order: orderReducer.initialState
}

export default function mainReducer(state: IState, action: any) {
	// Receiving previous state here
	const { customer, order } = state;

	// Receiving current state here
	const currentState = {
		customer: customerReducer.reducer(customer, action),
		order: orderReducer.reducer(order, action)
	};

	// Middlewares
	logger(action, state, currentState);

	return currentState;
}