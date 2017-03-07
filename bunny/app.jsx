import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import axios from 'axios';
import Login from './components/Login.jsx';
import Secret from './components/Secret.jsx';
import Main from './components/Main.jsx';
import All from './components/All.jsx';
import Form from './components/Form.jsx';
import PasswordShow from './components/PasswordShow.jsx';
import {notFound} from './components/404.jsx';
import {Vault} from './stores/Vault';

function authRequired(nextState, replace) {
    let token = sessionStorage.getItem('token');
    if (token) {
        axios({
            method: 'post',
            url: '/api-token-verify/',
            data: {
                'token': token
            }
        }).then(function (res) {

        }).catch(function(response) {
            replace('/');
            sweetAlert("Oops!", 'Token Expired', "info");
        });
    } else {
        replace('/');
    }

}

var vault = new Vault();

ReactDOM.render(
    <Router history={browserHistory} >
        <Route path="/" component={Login} />
        <Route path="/secret" component={Secret} />
        <Route path="/dashboard" onEnter={authRequired} component={Main}>
            <IndexRoute passwords={vault} component={All}/>
            <Route path="all"  passwords={vault} component={All} />
            <Route path="new" passwords={vault} component={Form} />
            <Route path=":id" passwords={vault} component={PasswordShow} />
            <Route path="*" component={notFound} />
            {/**       <Route path="posts/:id/" posts={ diary } component={Post} />
             <Route path="posts/:id/edit" posts={ diary } component={PostEdit} />

             <Route path="notes" notes={notes} component={Notes} /> **/}
        </Route>

    </Router>,
    document.getElementById('app')
);
