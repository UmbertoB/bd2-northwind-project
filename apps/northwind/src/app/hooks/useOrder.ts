import { useGlobalStore } from '../store';
import bindActions from '../store/bindActions';
import orderReducer from '../store/order';

const { actions } = orderReducer;
/**
 * useCustomers Custom Hook
 */
const useOrder = () => {
	const { state, dispatch } = useGlobalStore();

	// List of Props
	const { order } = state;

	// Bind Actions
	const orderActions = bindActions({
		...actions
	}, dispatch);

	return { ...order, ...orderActions };
}

export default useOrder;