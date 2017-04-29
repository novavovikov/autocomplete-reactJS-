import React from 'react';

const Input = ({findText, changeInput, keyUpHandle, blurHandle, setNotice}) => {
	return (
		<input className="autocomplete__input"
					type="text" 
					placeholder="Начните вводить название" 
					value={findText}
					onChange={changeInput} 
					onKeyUp={keyUpHandle}
					onBlur={blurHandle}
					onFocus={() => setNotice('')}
		/>
	)
};

export default Input;