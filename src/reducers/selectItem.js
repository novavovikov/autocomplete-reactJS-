const initialState = null;

export default function selectItem(state = initialState, action) {
	if (action.type === 'SELECT_ITEM') {
		return action.payload;
	}
	return state;
}