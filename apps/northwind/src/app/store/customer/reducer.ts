import { ICustomer, CUSTOMERS } from './types';

export const initialState: ICustomer = {
	data: [],
	metadata: null,
	isLoading: false,
	error: '',
	customerOnEdition: null,
}

export default function customer(state = initialState, action: any): ICustomer {
	switch (action.type) {
		case CUSTOMERS.INIT:
			return {
				...state,
				error: '',
				isLoading: true
			};
		case CUSTOMERS.SUCCESS:
			return {
				...state,
				data: [ ...state.data, ...action.payload.data ],
				metadata: action.payload.metadata,
				isLoading: false,
			};
		case CUSTOMERS.RESET_DATA:
			return {
				...state,
				data: [],
				metadata: null,
				isLoading: false,
			};
		case CUSTOMERS.RESET_EDIT_DATA:
			return {
				...state,
				customerOnEdition: null
			};
		case CUSTOMERS.DELETED:
			return {
				...state,
				data: state.data.filter(d => d.CustomerID !== action.payload),
			};
			
		case CUSTOMERS.ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload
			};
		case CUSTOMERS.OPEN_UPDATE:
			return {
				...state,
				customerOnEdition: action.payload
			}
		default: {
			return state;
		}
	}
}