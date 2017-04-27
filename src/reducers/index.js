import { combineReducers } from 'redux';

import list from './list';
import showList from './showList';
import findText from './findText';
import findList from './findList';
import findItems from './findItems';
import selectItem from './selectItem';
import itemPosition from './itemPosition';
import showLoader from './showLoader';
import setMessage from './setMessage';
import setNotice from './setNotice';

export default combineReducers({
	list,
	showList,
	findText,
	findList,
	findItems,
	selectItem,
	itemPosition,
	showLoader,
	setMessage,
	setNotice
});