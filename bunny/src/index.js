import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import Login from "component/Login";


ReactDOM.render(<Login />, document.getElementById('root'));
registerServiceWorker();
