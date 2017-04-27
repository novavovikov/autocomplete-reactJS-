const initialState = [];

export default function findList(state = initialState, action) {
	if (action.type === 'FIND_LIST') {
		return action.payload;
	}
	return state;
}