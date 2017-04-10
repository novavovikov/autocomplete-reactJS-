const initialState = '';

export default function findText(state = initialState, action) {
	if (action.type === 'FIND_ITEM') {
		return action.payload;
	}
	return state;
}