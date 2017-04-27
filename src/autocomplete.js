import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getList } from './actions/getList';
import { findText } from './actions/findText';
import { findList } from './actions/findList';
import { selectItem } from './actions/selectItem';
import { toggleList } from './actions/toggleList';
import { setMessage } from './actions/setMessage';
import { setNotice } from './actions/setNotice';
import { setPositionItem } from './actions/setPositionItem';

import { findItemsHandle } from './selectors/selectors';

import Input from './components/input';
import List from './components/list';
import Notice from './components/notice';
import Message from './components/message';

import './autocomplete.css';


//
const AutoComplete = ({list, findItems, showList, findText, selectItem, itemPosition, onGetList, onToggleList, onFindText, onFindList, onSelectItem, showLoader, setPositionItem, message, setMessage, notice, setNotice}) => {
	let newItemPosition = itemPosition;

	const changeInput = (item) => {
		if (list.length === 0) {
			onGetList()
		}

		newItemPosition = 0;

		if (findItems.length > 0) {
			onSelectItem(findItems[newItemPosition].Id)
		};

		onFindText(item.target.value);

		let findList = findItemsHandle(list, item.target.value);

		onFindList(findList);
		onToggleList(true);
	}

	const keyUpHandle = (e) => {
		(findItems.length === 0) ? setMessage('Не найдено') : setMessage('');
	}

	const blurHandle = () => {
		if (findItems.length !== 0) {
			onSelectItem(findItems[0].Id);
			onFindText(findItems[0].City);
		} else {
			setMessage('')
			setNotice('Выберите значание из списка')
		}

		onToggleList(false);
	}

	const keyDownHandle = (e) => {
		if (e.key === 'ArrowDown') {
			newItemPosition = itemPosition + 1;
		} else if (e.key === 'ArrowUp') {
			newItemPosition = itemPosition - 1;
		} else if (e.key === 'Escape') {
			onToggleList(false);
		} else if (e.key === 'Enter' && findItems.length > 0) {
				onSelectItem(findItems[itemPosition].Id);
				onFindText(findItems[itemPosition].City);
				onToggleList(false);
		}

		if (newItemPosition < 0) {
			setPositionItem(0);
			newItemPosition = 0;
		} else if (newItemPosition > findItems.length - 1) {
			setPositionItem(findItems.length - 1);
			newItemPosition = findItems.length - 1;
		} else {
			setPositionItem(newItemPosition);
		}

		if (findItems.length > 0 && showList === true) {
			onSelectItem(findItems[newItemPosition].Id)
		};
	}

	return (
			<div 
				className={(showLoader) ? 'autocomplete' : 'autocomplete'}
			>

				{(showLoader) ? (
					<div className="autocomplete__loader" />
				) : ''}

				<Input 
					findText={findText}
					changeInput={changeInput}
					keyUpHandle={keyUpHandle}
					blurHandle={blurHandle}
					keyDownHandle={keyDownHandle}
					setNotice={setNotice} 
				/>

				{(message !== '') ? (
					<Message message={message} />
				) : ''}

				{(notice !== '') ? (
					<Notice notice={notice} />
				) : ''}

				{(findItems.length !== 0) ? (
					<List 
						findItems={findItems}
						showList={showList}
						selectItem={selectItem}
						onSelectItem={onSelectItem}
						onFindText={onFindText}
						onToggleList={onToggleList}
					/>
				) : ''}
			</div>
	)
}


//
function mapStateToProps(state) {
	return {
		list: state.list,
		findItems: state.findList,
		findText: state.findText,
		showList: state.showList,
		selectItem: state.selectItem,
		itemPosition: state.itemPosition,
		showLoader: state.showLoader,
		message: state.setMessage,
		notice: state.setNotice
	}
}

function matchDispatchtoProps(dispatch) {
	return bindActionCreators({
		onGetList: getList,
		onFindText: findText,
		onFindList: findList,
		onSelectItem: selectItem,
		onToggleList: toggleList,
		setMessage: setMessage,
		setNotice: setNotice,
		setPositionItem: setPositionItem,
	}, dispatch)
}

export default connect(mapStateToProps, matchDispatchtoProps)(AutoComplete);