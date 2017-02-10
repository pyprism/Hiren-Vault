import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import axios from 'axios';
import Login from './components/Login.jsx';

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

ReactDOM.render(
    <Router history={browserHistory} >
        <Route path="/" component={Login} />
       {/**  <Route path="/secret" component={Secret} />
        <Route path="/dashboard" onEnter={authRequired} component={Main}>
            <IndexRoute posts={ diary } component={Posts}/>
            <Route path="posts" posts={ diary } component={Posts} />
            <Route path="posts/:id/" posts={ diary } component={Post} />
            <Route path="posts/:id/edit" posts={ diary } component={PostEdit} />
            <Route path="new" component={Form} />
            <Route path="notes" notes={notes} component={Notes} />
        </Route> **/}

    </Router>,
    document.getElementById('app')
);
