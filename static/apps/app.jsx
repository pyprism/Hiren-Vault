import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Login from './components/Login.jsx';
import Main from './components/Main.jsx';
import Secret from './components/Secret.jsx';
import Passwords from './components/Passwords.jsx';
import PasswordForm from './components/PasswordForm.jsx';
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

function keyRequired(nextState, replace){
    if(!sessionStorage.getItem('key')) {
        replace('/dashboard/secret/');
        sweetAlert("Oops!", 'Secret Key Required', "info");
    }
}


ReactDOM.render(
    <Router history={browserHistory} >
        <Route path="/" component={Login} />
        <Route path="/key" onEnter={authRequired} component={Secret} />
        <Route path="/app" onEnter={authRequired} component={Main}>
            <Route path="passwords" onEnter={keyRequired} component={Passwords} />
            <Route path="password/create" onEnter={keyRequired} component={PasswordForm} />
        </Route>
    </Router>,
    document.getElementById('app')
);