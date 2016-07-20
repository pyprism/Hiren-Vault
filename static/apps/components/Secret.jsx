import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';
import { browserHistory } from 'react-router';
import {encrypt, decrypt} from '../utils/pgp.js';


export default class Secret extends React.Component {

    key(e){
        e.preventDefault();
        let random = Array(8+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, 8);
        let secret = ReactDOM.findDOMNode(this.refs.key).value;

        axios({
            method: 'get',
            url: '/api/secret/',
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
        }).then(function (response) {
            decrypt(secret, response.data[0].key).then(function (bunny) {
                sessionStorage.setItem('key', bunny);
                browserHistory.push('/app/passwords/');
            }).catch(function (err) {
                sweetAlert("Oops!", "Key is not valid !", "error");
            })
        }).catch(function (response) {
            if(response.status == 404){
                encrypt(secret, random).then(function (bunny) {
                    axios({
                        method: 'post',
                        url: '/api/secret/',
                        data: {'key': bunny},
                        headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
                    }).then(function(response) {
                        sessionStorage.setItem('key', random);
                        browserHistory.push('/app/passwords/');
                    }).catch(function (err) {
                        console.log(err);
                        sweetAlert("Oops!", err, "error");
                    })
                });
            }else if (response.status == 403) {
                browserHistory.push('/');
                sweetAlert("Oops!", 'Token Expired! Login again.', "error");
            }
});
    }

    render () {
        return (
            <div>

                <Helmet
                    title="Vault: Secret Key"
                    link={[
                    {"rel": "shortcut icon", "href": "/static/favicon.ico"},
                    {"rel": "stylesheet", "type": "text/css", "href": "/static/css/secret.css"}
                ]}
                />

                <section className="webdesigntuts-workshop">
                    <form onSubmit={this.key.bind(this)}>
                        <input type="password" required ref="key" placeholder="Your key" />
                        <button type="submit">Unlock</button>
                    </form>
                </section>
            </div>
        )
    }
}