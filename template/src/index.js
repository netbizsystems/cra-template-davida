
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//
import './index.css';
import App from './app/App';
import store from './app/store';
import * as serviceWorker from './serviceWorker';
import ContextProvider from './app/context/ContextProvider';

ReactDOM.render(
  <React.StrictMode>

      <Provider store={store}>
        
        <ContextProvider>
          <App serverVars={document.querySelector('meta[name="davida-api-base"]').content} />
        </ContextProvider>

      </Provider>

  </React.StrictMode>,
  document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

//console.log(ContextProvider);