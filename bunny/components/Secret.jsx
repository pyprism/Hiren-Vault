import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import { browserHistory } from 'react-router';
import { observer } from "mobx-react";
import SecretForm from '../models/forms/SecretForm';



@observer
export default class Secret extends React.Component {
   /** secret(e) {
        e.preventDefault();
        sessionStorage.setItem('key', ReactDOM.findDOMNode(this.refs.secret).value);
        browserHistory.push('/dashboard/all/');
    } **/

    render () {
        return <div className="wrapper">
            <Helmet
                title="Hiren-Password: Secret Key"
                link={[
                    {"rel": "stylesheet", "href": "/static/css/bootstrap.min.css"},
                    {"rel": "stylesheet", "href": "/static/css/login.css"},
                    {"rel": "icon", "href": "/static/favicon.ico"},
                    {"rel": "stylesheet", "type": "text/css", "href": "/static/css/sweetalert.css"}
                ]}
            />

            <form className="form-signin" >
                <h2 className="form-signin-heading" htmlFor={SecretForm.$('secret').id}>Secret Key</h2>
                <input className="form-control"  {...SecretForm.$('secret').bind({ type: 'password'})} autoFocus />
                <p>{SecretForm.$('secret').error}</p>
                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={SecretForm.onSubmit}>Proceed</button>
            </form>

        </div>


    }

}