const initialState = '';

export default function setNotice(state = initialState, action) {
	if (action.type === 'SHOW_NOTICE') {
		return action.payload;
	}
	return state;
}