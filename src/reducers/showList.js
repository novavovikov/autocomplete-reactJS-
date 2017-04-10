const initialState = true;

export default function showList(state = initialState, action) {
	if (action.type === 'TOGGLE_LIST') {
		return action.payload;
	}
	return state;
}