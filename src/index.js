import "./common/style/style.min.css"
import "./common/style/theme.min.css"
import "./common/style/style.css"
import "./common/style/blocks.css"
import "./common/style/colors-dark.css"
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <App />,
  document.getElementById('page')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
