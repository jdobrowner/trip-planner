import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import App from './components/app';
import reducers from './reducers/root.reducer';
import routes from './routes';
import { LOAD_TRIPS } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const savedTrips = JSON.parse(localStorage.getItem('trips'));
if (savedTrips) {
	store.dispatch({ type: LOAD_TRIPS, payload: savedTrips });
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes} />
	</Provider>,
	document.querySelector('.container'));
