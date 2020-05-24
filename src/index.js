import React from 'react';
import ReactDOM from 'react-dom';
import Context from './context'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import App from './App';
import './GlobalStyles.css'

ReactDOM.render(
  <Context.Provider>
    <App />
  </Context.Provider>,
  document.getElementById('app')
);
