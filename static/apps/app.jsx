import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Login from './components/Login.jsx';
import Main from './components/Main.jsx';
import Secret from './components/Secret.jsx';
import axios from 'axios';


function authRequired(nextState, replace) {
    let token = sessionStorage.getItem('token');
    if (token) {
        axios({
            method: 'post',
            url: '/api-token-verify/',
            data: {
                'token': token
            }
        }).catch(function(response) {
            replace('/');
            sweetAlert("Oops!", 'Token Expired', "info");
        });
    } else {
        replace('/');
    }

}


ReactDOM.render(
    <Router history={browserHistory} >
        <Route path="/" component={Login} />
        <Route path="/key" onEnter={authRequired} component={Secret} />
        <Route path="/dashboard" onEnter={authRequired} component={Main}>
        </Route>
    </Router>,
    document.getElementById('app')
);