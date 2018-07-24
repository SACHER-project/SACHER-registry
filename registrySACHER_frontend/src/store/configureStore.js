import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers';
import thunk from "redux-thunk";

import {routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
// import { composeWithDevTools } from 'redux-devtools-extension';


//const middleware = composeWithDevTools(applyMiddleware(promise(), thunk));

export const history = createHistory()
const middleware = [thunk, routerMiddleware(history)]



export default function configureStore() {
    return createStore(rootReducer, applyMiddleware(...middleware));
}