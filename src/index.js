import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './components/app';
import reducers from './reducers/root.reducer';
// import { LOAD_TRIPS } from './actions/types';

const state = {};
// const token = localStorage.getItem('trips');
// if (trips) {
//  state = trips;
// 	store.dispatch({ type: LOAD_TRIPS });
// }

ReactDOM.render(
	<Provider store={createStore(reducers)}>
		<App />
	</Provider>,
	document.querySelector('.container'));
