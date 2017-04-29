import React from 'react';

const List = ({findItems, showList, selectItem, mouseDownHandle}) => {
	return (
		<ul 
			className={(showList) ? 'autocomplete__list _active' : 'autocomplete__list'}
		>
			{findItems.map((item) => (
				<li 
					key={item.Id} 
					className={(item.Id === selectItem) ? 'autocomplete__item _active' : 'autocomplete__item'}
					onMouseDown={() => mouseDownHandle(item.Id, item.City, false)}
				>
				{item.City}
				</li>
			))}
		</ul>
	)
};

export default List;