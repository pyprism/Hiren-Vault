import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';
import {encrypt, decrypt} from '../utils/pgp.js';
import {bunny} from '../ajax/password_form.js';


export default class PasswordForm extends React.Component {

    editor(e){
        e.preventDefault();
        let data = [];
        data['site_url'] = ReactDOM.findDOMNode(this.refs.site_url).value;
        data['username'] = ReactDOM.findDOMNode(this.refs.username).value;
        data['email'] = ReactDOM.findDOMNode(this.refs.email).value;
        data['tag'] = ReactDOM.findDOMNode(this.refs.tag).value;
        data['password'] = ReactDOM.findDOMNode(this.refs.password).value;
        data['note'] = ReactDOM.findDOMNode(this.refs.note).value;
        bunny(data);
    }

    componentDidMount(){
        (function () {  // function for password generate
            $( "#generate" ).click(function() {
                var length = $('#range').val();
                var charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
                var retVal = "";
                for (var i = 0, n = charset.length; i < length; ++i) {
                    retVal += charset.charAt(Math.floor(Math.random() * n));
                }
                $('#inputPassword').val(retVal);
            });
        })();

        (function () {  // function for tag autocomplete
            var input = document.getElementById("tag");
            var awesomplete = new Awesomplete(input);
            awesomplete.data = function(item, input) {
                return { label: item.name, value: item.id };
            }
            axios({
                method: 'get',
                url: '/api/tag/',
                headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
            }).then(function (response) {
                let bunny = [];
                response.data.forEach(function (data) {
                    let nisha = {'name': '', 'id': ''};
                    nisha['name'] = data.name;
                    nisha['id'] = '' + data.id;
                    bunny.push(nisha);
                });
                awesomplete.list = bunny;
            }).catch(function (response) {
                sweetAlert("Oops!", response.data, "error");
                console.error(response);
            });
        })();
    }

    render() {
        return (
            <div>
                <Helmet
                    title="Vault->Save Password"
                />

                <form className="form col-md-12 center-block" onSubmit={this.editor.bind(this)} >
                    <div className="form-group">
                        <label >URL:</label>
                        <input type="url" required ref="site_url" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label >Username</label>
                        <input type="text"  ref="username" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label >Email</label>
                        <input type="email"  ref="email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label >Tag</label>
                        <input type="text" ref="tag" id="tag" className="form-control awesomplete tag" />
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input name="text"  required ref="password" id="inputPassword" className="form-control" />
                        <br/>
                        <button type="button" className="btn btn-info" id="generate">Generate Password</button>
                        Length <input type="number" min="5" max="100" defaultValue="12" id="range"/>
                    </div>
                    <div className="form-group">
                        <label >Optional Note</label>
                        <textarea  ref="note" className="form-control" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Save</button>
                    </div>
                </form>

            </div>
        )
    }
}