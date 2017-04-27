import React from 'react';

const Input = ({findText, changeInput, keyDownHandle, keyUpHandle, blurHandle, setNotice}) => {
	return (
		<input className="autocomplete__input"
					type="text" 
					placeholder="Начните вводить название" 
					value={findText}
					onChange={changeInput} 
					onKeyDown={keyDownHandle}
					onKeyUp={keyUpHandle}
					onBlur={blurHandle}
					onFocus={() => setNotice('')}
		/>
	)
};

export default Input;