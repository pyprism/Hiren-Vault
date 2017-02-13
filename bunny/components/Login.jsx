import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import LoginForm from '../models/forms/LoginForm';
import { observer } from "mobx-react";

@observer
export default class Login extends React.Component {

    /*login(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/api-token-auth/',
            data: {
                'username': ReactDOM.findDOMNode(this.refs.username).value,
                'password': ReactDOM.findDOMNode(this.refs.password).value
            }
        }).then(function (response) {
            if (response.data['token']) {
                sessionStorage.setItem('token', response.data['token']);
                browserHistory.push('/secret/');
            }
        })
            .catch(function (response) {
                sweetAlert("Oops!", 'Username/Password is not correct', "error");
            });
        }*/

        render () {
            return <div className="wrapper">
            <Helmet
            title="Hiren-Password: Login"
            link={[
                {"rel": "stylesheet", "href": "/static/css/bootstrap.min.css"},
                {"rel": "stylesheet", "href": "/static/css/login.css"},
                {"rel": "icon", "href": "/static/favicon.ico"},
                {"rel": "stylesheet", "type": "text/css", "href": "/static/css/sweetalert.css"}
                ]}
                />
            {/**  <form className="form-signin" onSubmit={this.login.bind(this)} >
             <h2 className="form-signin-heading">Please login</h2>
             <input type="text" className="form-control" ref="username" placeholder="Username" required="" autoFocus />
             <input type="password" className="form-control" ref="password" placeholder="Password" required/>
             <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
         </form> **/}


         <form className="form-signin">
         <h2 className="form-signin-heading">Please login</h2>
         <label htmlFor={LoginForm.$('username').id}>
         {LoginForm.$('username').label}
         </label>
         <input className="form-control" {...LoginForm.$('username').bind()} autoFocus  />
         <p>{LoginForm.$('username').error}</p>

         <label htmlFor={LoginForm.$('password').id}>
         {LoginForm.$('password').label}
         </label>
         <input className="form-control" {...LoginForm.$('password').bind({ type: 'password'})} />
         <p>{LoginForm.$('password').error}</p>

         <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={LoginForm.onSubmit}>Login</button>
                {/**  <button type="button" onClick={LoginForm.onReset}>Reset</button>
            <button type="button" onClick={LoginForm.onClear}>Clear</button>  **/}

            <p>{LoginForm.error}</p>
            </form>


            </div>


        }
    }
