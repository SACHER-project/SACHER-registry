import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import registerServiceWorker from './components/registerServiceWorker';
import configureStore from './store/configureStore';


const store = configureStore();

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

registerServiceWorker();
