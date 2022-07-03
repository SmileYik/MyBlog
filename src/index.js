import "./common/style/style.min.css"
import "./common/style/theme.min.css"
import "./common/style/style.css"
import "./common/style/blocks.css"
import "./common/style/colors-dark.css"
import React from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals';


import {createRoot} from 'react-dom/client';

const container = document.getElementById('page');
const root = createRoot(container);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
