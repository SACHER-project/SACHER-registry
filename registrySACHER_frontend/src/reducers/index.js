import { combineReducers } from 'redux';
import DomainReducer from './domainReducer';
import { routerReducer } from 'react-router-redux'


const reducers = {
    domainStore: DomainReducer,
    routing: routerReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;