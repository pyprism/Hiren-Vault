import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';
import { browserHistory } from 'react-router';


export default class Secret extends React.Component {

    key(e){
        e.preventDefault();
        let random = Array(8+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, 8);
        let secret = ReactDOM.findDOMNode(this.refs.secret).value;

        axios({
            method: 'get',
            url: '/api/secret/',
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
        }).then(function (response) {
            Crypt.decrypt(secret, response.data[0].key).then(function (bunny) {
                sessionStorage.setItem('key', bunny.data);
                browserHistory.push('/dashboard/stats/');
            }).catch(function (err) {
                sweetAlert("Oops!", "Key is not valid !", "error");
            })
        }).catch(function (response) {
            if(response.status == 404){
                Crypt.encrypt(secret, random).then(function (bunny) {
                    axios({
                        method: 'post',
                        url: '/api/secret/',
                        data: {'key': bunny.data},
                        headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
                    }).then(function(response) {
                        sessionStorage.setItem('key', random);
                        browserHistory.push('/dashboard/stats/');
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
                    title="Password: Secret Key"
                    link={[
                    {"rel": "shortcut icon", "href": "/static/favicon.ico"},
                    {"rel": "stylesheet", "type": "text/css", "href": "/static/css/secret.css"}
                ]}
                />

                <section className="webdesigntuts-workshop">
                    <form onSubmit={this.key.bind(this)}>
                        <input type="password" required ref="key" placeholder="Your key" />
                        <button>Unlock</button>
                    </form>
                </section>
            </div>
        )
    }
}