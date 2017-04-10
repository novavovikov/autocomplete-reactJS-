import React from 'react';
import { connect } from 'react-redux';

import { getList } from './actions/getList';


//
const App = ({list, findItems, showList, findText, selectItem, itemPosition, onGetList, onToggleList, onFindItem, onSelectItem, showLoader, setPositionItem, message, setMessage}) => {
	let textInput, newItemPosition = itemPosition;

	const changeInput = () => {

		if (list.length === 0) {
			onGetList()
		}

		newItemPosition = 0;

		if (findItems.length > 0) {
			onSelectItem(findItems[newItemPosition].Id)
		};

		onFindItem(textInput.value);
		onToggleList(true);
	}

	const keyUpHandle = (e) => {
		(findItems.length === 0) ? setMessage('Не найдено') : setMessage('');
	}

	const keyDownHandle = (e) => {
		if (e.key === 'ArrowDown') {
			newItemPosition = itemPosition + 1;
		} else if (e.key === 'ArrowUp') {
			newItemPosition = itemPosition - 1;
		} else if (e.key === 'Escape') {
			onToggleList(false);
		} else if (e.key === 'Enter') {
			onSelectItem(findItems[itemPosition].Id);
			onFindItem(findItems[itemPosition].City);
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
				className={(showLoader) ? 'autocomplete _loading' : 'autocomplete'}
			>
				<input className="autocomplete__input"
					type="text" 
					placeholder="Начните вводить название" 
					ref={(input) => textInput = input}
					onChange={changeInput} 
					onKeyDown={keyDownHandle}
					onKeyUp={keyUpHandle}
					value={findText}
				/>

				{(message !== '') ? (
					<div className="autocomplete__message">{message}</div>
				) : ''}

				{(findItems.length !== 0) ? (
					<ul 
						className={(showList) ? 'autocomplete__list _active' : 'autocomplete__list'}
					>
						{findItems.map((item) => (
							<li 
								key={item.Id} 
								className={(item.Id === selectItem) ? 'autocomplete__item _active' : 'autocomplete__item'}
								onBlur={() => onToggleList(false)}
								onClick={function() {
									onSelectItem(item.Id);
									onFindItem(item.City);
									onToggleList(false);
								}}
							>
							{item.City}
							</li>
						))}
					</ul>
				) : ''}
			</div>
	)
}



//
function mapStateToProps(state) {
	return {
		list: state.list,
		findItems: state.list.filter((item) => item.City.toLowerCase().includes(state.findText.toLowerCase())),
		findText: state.findText,
		showList: state.showList,
		selectItem: state.selectItem,
		itemPosition: state.itemPosition,
		showLoader: state.showLoader,
		message: state.setMessage
	}
}

function matchDispatchtoProps(dispatch) {
	return {
		onGetList: () => {
			dispatch(getList());
		},
		onToggleList: (position) => {
			dispatch({
				type: 'TOGGLE_LIST',
				payload: position
			})
		},
		onFindItem: (text) => {
			dispatch({
				type: 'FIND_ITEM',
				payload: text
			})
		},
		onSelectItem: (id) => {
			dispatch({
				type: 'SELECT_ITEM',
				payload: id
			})
		},
		setPositionItem: (position) => {
			dispatch({
				type: 'SET_POSITION',
				payload: position
			})
		},
		setMessage: (message) => {
			dispatch({
				type: 'SHOW_MESSAGE',
				payload: message
			})
		},
	}
}

export default connect(mapStateToProps, matchDispatchtoProps)(App);
