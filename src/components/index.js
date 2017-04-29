import React from 'react';

import Input from './input';
import List from './list';
import Notice from './notice';
import Message from './message';

//
const Wrap = ({showLoader, findText, changeInput, keyUpHandle, blurHandle, keyDownHandle, setNotice, message, notice, findItems, showList, selectItem, onSelectItem, onFindText, onToggleList}) => {
	console.log('wrap')
	return (
			<div className='autocomplete'>
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

export default Wrap;