import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import { browserHistory } from 'react-router';


export default class Secret extends React.Component {
    secret(e) {
        e.preventDefault();
        sessionStorage.setItem('key', ReactDOM.findDOMNode(this.refs.secret).value);
        browserHistory.push('/dashboard/all/');
    }

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

            <form className="form-signin" onSubmit={this.secret.bind(this)} >
                <h2 className="form-signin-heading">Secret Key</h2>
                <input type="password" className="form-control" ref="secret" placeholder="Key" required autoFocus />
                <button className="btn btn-lg btn-danger btn-block" type="submit">Proceed</button>
            </form>

        </div>


    }

}