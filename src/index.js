import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';

// Reducer that holds our results
const example = (state = {}, action) => {
    if(action.type === 'SET_EXAMPLE') {
        return action.payload;
    }
    return state;
}

// Reducer that holds horror movies
const horror = (state = [], action) => {
    if (action.type === 'SET_HORROR') {
        return action.payload;
    }
    return state;
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        example,
        horror
    }),
    applyMiddleware(logger),
);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
