import React from 'react';

const List = ({findItems, showList, selectItem, onSelectItem, onFindText, onToggleList}) => {
	return (
		<ul 
			className={(showList) ? 'autocomplete__list _active' : 'autocomplete__list'}
		>
			{findItems.map((item) => (
				<li 
					key={item.Id} 
					className={(item.Id === selectItem) ? 'autocomplete__item _active' : 'autocomplete__item'}
					onMouseDown={() => {
						onSelectItem(item.Id);
						onFindText(item.City);
						onToggleList(false);
					}}
				>
				{item.City}
				</li>
			))}
		</ul>
	)
};

export default List;