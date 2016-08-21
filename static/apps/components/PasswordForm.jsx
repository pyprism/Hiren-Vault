import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';
import {encrypt} from '../utils/pgp.js';
import {bunny} from '../ajax/password_form.js';


export default class PasswordForm extends React.Component {

    editor(e){
        e.preventDefault();
        (async function () {
            let encrypted = {};
            let data = [];
            data['site_url'] = ReactDOM.findDOMNode(this.refs.site_url).value;
            data['username'] = ReactDOM.findDOMNode(this.refs.username).value;
            data['email'] = ReactDOM.findDOMNode(this.refs.email).value;
            data['tag'] = ReactDOM.findDOMNode(this.refs.tag).value;
            data['password'] = ReactDOM.findDOMNode(this.refs.password).value;
            data['note'] = ReactDOM.findDOMNode(this.refs.note).value;
            for(var key in data) {
                if (key === 'tag')
                    encrypted[key] = data[key];
                else
                    encrypted[key] = await encrypt(sessionStorage.getItem('key'), data[key]);
            }
            axios({
                method: 'post',
                url: '/api/vault/',
                data: encrypted,
                headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
            }).then(function(response) {
                $.notify("Data Saved", "success");
            }).catch(function (err) {
                console.error(err);
                sweetAlert("Oops!", 'Form data is not valid', "error");
            });
        }.bind(this))();
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

        (async function () {
            let  response = await axios.get('/api/tag/', {
                headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
            });
            let bunny = [];
            response.data.forEach(async function (data) {
                let nisha = {'name': '', 'id': ''};
                nisha['name'] = data.name;
                nisha['id'] = '' + data.id;
                bunny.push(nisha);
            });
            $('#tag').selectize({
                delimiter: ',',
                valueField: 'id',
                labelField: 'name',
                searchField: ['name'],
                options: bunny
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
                        <input type="text" ref="tag" id="tag" className="form-control tag" />
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