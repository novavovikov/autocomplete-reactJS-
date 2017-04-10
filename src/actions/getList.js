export const getList = () => {
	return dispatch => {
		let xhr = new XMLHttpRequest(), list, timer;
		xhr.open('GET', 'kladr.json', false);
		xhr.send();

		timer = setTimeout(function() {
			dispatch({
				type: 'SHOW_LOADER',
				payload: true
			});
		}, 500);

		if (xhr.status !== 200) {
			console.log( xhr.status + ': ' + xhr.statusText ); 
		} else {
			list = JSON.parse(xhr.responseText); 

			list.sort(function(a, b) {
				if (a.name > b.name) return 1;
				if (a.name < b.name) return -1;
				return 0;
			});


			//loader
			clearTimeout(timer);
			dispatch({
				type: 'SHOW_LOADER',
				payload: false
			});

			//
			dispatch({
				type: 'GET_LIST',
				payload: list
			});

			//
			dispatch({
				type: 'FIND_ITEMS',
				payload: list
			});

			//
			dispatch({
				type: 'SET_POSITION',
				payload: 0
			});
		}
	}
}	