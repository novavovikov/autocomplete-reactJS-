const initialState = '';

export default function setMessage(state = initialState, action) {
	if (action.type === 'SHOW_MESSAGE') {
		return action.payload;
	}
	return state;
}