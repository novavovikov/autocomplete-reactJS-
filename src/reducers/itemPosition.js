const initialState = 0;

export default function itemPosition(state = initialState, action) {
	if (action.type === 'SET_POSITION') {
		return action.payload;
	}
	return state;
}