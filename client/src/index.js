import materializeCSS from 'materialize-css/dist/css/materialize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import store from './store';

//const store = createStore(reducers, {}, applyMiddleware(reduxThunk) );


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);


