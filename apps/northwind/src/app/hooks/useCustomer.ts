import { useGlobalStore } from '../store';
import bindActions from '../store/bindActions';
import customerReducer from '../store/customer';

const { actions } = customerReducer;

/**
 * useCustomers Custom Hook
 */
const useCustomers: any = () => {
	const { state, dispatch } = useGlobalStore();

	// List of Props
	const { customer } = state;

	// Bind Actions
	const loginActions = bindActions({
		...actions
	}, dispatch);

	return { ...customer, ...loginActions };
}

export default useCustomers;