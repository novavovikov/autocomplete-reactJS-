const initialState = [];

export default function list(state = initialState, action) {
	if (action.type === 'GET_LIST') {
		return action.payload;
	}
	return state;
}