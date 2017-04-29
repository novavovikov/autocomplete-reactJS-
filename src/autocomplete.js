import React, { Component } from 'react';
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


class AutoComplete extends Component {
	Constructor() {
		this.newItemPosition = 0;
	}


	changeInput(item) {
		if (this.props.list.length === 0) {
			this.props.onGetList()
		}

		this.newItemPosition = 0;

		if (this.props.findItems.length > 0) {
			this.props.onSelectItem(this.props.findItems[this.newItemPosition].Id)
		};

		this.props.onFindText(item.target.value);

		let findList = findItemsHandle(this.props.list, item.target.value);

		this.props.onFindList(findList);
		this.props.onToggleList(true);
	}

	keyUpHandle(e) {
		(this.props.findItems.length === 0) ? setMessage('Не найдено') : setMessage('');
	}

	blurHandle() {
		if (this.props.findItems.length !== 0) {
			this.props.onSelectItem(this.props.findItems[0].Id);
			this.props.onFindText(this.props.findItems[0].City);
		} else {
			setMessage('')
			setNotice('Выберите значание из списка')
		}

		this.props.onToggleList(false);
	}

	keyDownHandle(e) {
		if (e.key === 'ArrowDown') {
			this.newItemPosition = this.props.itemPosition + 1;
		} else if (e.key === 'ArrowUp') {
			this.newItemPosition = this.props.itemPosition - 1;
		} else if (e.key === 'Escape') {
			this.props.onToggleList(false);
		} else if (e.key === 'Enter' && this.props.findItems.length > 0) {
			this.props.onSelectItem(this.props.findItems[this.props.itemPosition].Id);
			this.props.onFindText(this.props.findItems[this.props.itemPosition].City);
			this.props.onToggleList(false);
		}

		if (this.newItemPosition < 0) {
			setPositionItem(0);
			this.newItemPosition = 0;
		} else if (this.newItemPosition > this.props.findItems.length - 1) {
			setPositionItem(this.props.findItems.length - 1);
			this.newItemPosition = this.props.findItems.length - 1;
		} else {
			this.props.setPositionItem(this.newItemPosition);
		}

		if (this.props.findItems.length > 0 && this.props.showList === true) {
			this.props.onSelectItem(this.props.findItems[this.newItemPosition].Id)
		};
	}


	render() {
		return (
			<div className='autocomplete'>
				{(this.props.showLoader) ? (
					<div className="autocomplete__loader" />
				) : ''}

				<Input 
					findText={this.props.findText}
					changeInput={this.changeInput.bind(this)}
					keyUpHandle={this.keyUpHandle.bind(this)}
					blurHandle={this.blurHandle.bind(this)}
					keyDownHandle={this.keyDownHandle.bind(this)}
					setNotice={this.props.setNotice} 
				/>

				{(this.props.message !== '') ? (
					<Message message={this.props.message} />
				) : ''}

				{(this.props.notice !== '') ? (
					<Notice notice={this.props.notice} />
				) : ''}

				{(this.props.findItems.length !== 0) ? (
					<List 
						findItems={this.props.findItems}
						showList={this.props.showList}
						selectItem={this.props.selectItem}
						onSelectItem={this.props.onSelectItem}
						onFindText={this.props.onFindText}
						onToggleList={this.props.onToggleList}
					/>
				) : ''}
			</div>
		)
	}
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