import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers';
import thunk from 'redux-thunk';

import AutoComplete from './autocomplete';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store={store}>
		<AutoComplete />
	</Provider>,
  document.getElementById('root')
);
