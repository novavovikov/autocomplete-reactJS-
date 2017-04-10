const initialState = false;

export default function showLoader(state = initialState, action) {
	if (action.type === 'SHOW_LOADER') {
		return action.payload;
	}
	return state;
}