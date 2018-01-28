import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom'
import App from './App';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
