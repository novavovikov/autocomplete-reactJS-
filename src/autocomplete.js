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

import { findItemsHandle } from './selectors/selectors';

import Input from './components/input';
import List from './components/list';
import Notice from './components/notice';
import Message from './components/message';

import './autocomplete.css';


class AutoComplete extends Component {
	constructor(props) {
	  super(props);
	  this.itemPosition = 0;
	}


	changeInput = (item) => {
		if (this.props.list.length === 0) {
			this.props.onGetList()
		}

		this.props.onFindText(item.target.value);

		let findList = findItemsHandle(this.props.list, item.target.value);

		this.props.onFindList(findList);
		this.props.onToggleList(true);
	}

	keyUpHandle = (e) => {
		if (this.props.findItems.length === 0) {
			this.props.setMessage('Не найдено');
		} else {
			if (e.key === 'ArrowDown') {
				this.itemPosition++;
			} else if (e.key === 'ArrowUp') {
				this.itemPosition--;
			} else if (e.key === 'Escape') {
				this.props.onToggleList(false);
			} else if (e.key === 'Enter') {
				this.props.onFindText(this.props.findItems[this.itemPosition].City);
				this.props.onToggleList(false);
			}

			if (this.itemPosition < 0) {
				this.itemPosition = 0;
			} else if (this.itemPosition > this.props.findItems.length - 1) {
				this.itemPosition = this.props.findItems.length - 1;
			}

			this.props.onSelectItem(this.props.findItems[this.itemPosition].Id);
		}
	}

	blurHandle = () => {
		if (this.props.findItems.length > 0 && this.props.showList) {
			this.props.onSelectItem(this.props.findItems[0].Id);
			this.props.onFindText(this.props.findItems[0].City);
		} else {
			this.props.setMessage('')
			this.props.setNotice('Выберите значание из списка')
		}

		this.props.onToggleList(false);
	}

	mouseDownHandle = (id, city, toggle) => {
		this.props.onSelectItem(id);
		this.props.onFindText(city);
		this.props.onToggleList(toggle);
	}

	render() {
		return (
			<div className='autocomplete'>
				{(this.props.showLoader) ? (
					<div className="autocomplete__loader" />
				) : ''}

				<Input 
					findText={this.props.findText}
					changeInput={this.changeInput}
					keyUpHandle={this.keyUpHandle}
					blurHandle={this.blurHandle}
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
						mouseDownHandle={this.mouseDownHandle}
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
	}, dispatch)
}

export default connect(mapStateToProps, matchDispatchtoProps)(AutoComplete);