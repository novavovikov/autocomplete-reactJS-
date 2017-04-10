const initialState = [];

export default function findItems(state = initialState, action) {
	if (action.type === 'FIND_ITEMS') {
		return action.payload;
	}
	return state;
}