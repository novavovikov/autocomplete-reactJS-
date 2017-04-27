const initialState = '';

export default function findText(state = initialState, action) {
	if (action.type === 'FIND_TEXT') {
		return action.payload;
	}
	return state;
}