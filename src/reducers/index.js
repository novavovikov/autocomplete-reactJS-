import { combineReducers } from 'redux';

import list from './list';
import showList from './showList';
import findText from './findText';
import findItems from './findItems';
import selectItem from './selectItem';
import itemPosition from './itemPosition';
import showLoader from './showLoader';
import setMessage from './setMessage';

export default combineReducers({
	list,
	showList,
	findText,
	findItems,
	selectItem,
	itemPosition,
	showLoader,
	setMessage
});