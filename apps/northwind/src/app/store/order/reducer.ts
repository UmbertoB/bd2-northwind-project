import { IOrder, ORDERS } from './types';

export const initialState: IOrder = {
	data: [],
	metadata: null,
	isLoading: false,
	error: '',
	orderDetail: null,
}

export default function order(state = initialState, action: any): IOrder {
	switch (action.type) {
		case ORDERS.INIT:
			return {
				...state,
				error: '',
				isLoading: true
			};
		case ORDERS.SUCCESS:
			return {
				...state,
				data: [ ...state.data, ...action.payload.data ],
				metadata: action.payload.metadata,
				isLoading: false,
			};
		case ORDERS.ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload
			};
		case ORDERS.RESET_DATA:
			return {
				...state,
				data: [],
				metadata: null,
				isLoading: false,
			};
		case ORDERS.OPEN_DETAIL:
			return {
				...state,
				orderDetail: action.payload
			}
		default: {
			return state;
		}
	}
}