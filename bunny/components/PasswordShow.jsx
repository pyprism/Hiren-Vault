import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';
import { toJS } from "mobx";
import { browserHistory } from 'react-router';
import { observer } from "mobx-react";
import {Link} from 'react-router';
import Crypt from '../utils/Crypt.jsx';


@observer
export default class PasswordShow extends React.Component {

    constructor(props) {
        super(props);
        this.props.route.passwords.vaultId = this.props.params.id;
        this.props.route.passwords.findVaultById();
    }

    componentDidMount() {
        let icon = ReactDOM.findDOMNode(this.refs.iconPicker);
        $(icon).iconpicker();  // initializing icon picker

        (function(){ //random password generator
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
    }

    checkBox(){ // define checkbox state
        if(this.props.route.passwords.password['audit']) {
            return (
                <div>
                    <input type="checkbox" ref="audit" defaultChecked/> Enable Audit
                </div>
            )
        } else {
            return(
                <div>
                    <input type="checkbox" ref="audit" /> Enable Audit
                </div>
            )
        }
    }

    deletePost = () => {  // delete button
        var id = this.props.route.passwords.vaultId;

        let message = "Delete This Item",
            title = "Are you sure ?";
        eModal.confirm(message, title)
            .then(function(){
                axios({
                    method: 'delete',
                    url: '/api/vault/' + id + '/',
                    headers: {
                        'Authorization': "JWT " + sessionStorage.getItem('token')
                    }
                }).then(function (data) {
                    sweetAlert("Deleted", "Vault deleted", "success");
                    this.props.route.passwords.loaded = false;
                    browserHistory.push('/dashboard/all/');
                }.bind(this)).catch(function (error) {
                    console.error(error);
                    sweetAlert("Error", "Error in deletion!", "error");
                })
            }.bind(this), function(){

            });
    }

    saveChanged() {
        let id = this.props.route.passwords.vaultId;

        let message = "Save updated data ?",
            title = "Are you sure ?";
        eModal.confirm(message, title)
            .then(function(){

                let random = forge.random.getBytesSync(32),
                    _salt = forge.random.getBytesSync(128),
                    iteration = ReactDOM.findDOMNode(this.refs.iteration).value,
                    key = forge.pkcs5.pbkdf2(sessionStorage.getItem('key'), _salt, iteration, 32);

                axios({
                    method: 'patch',  // 'patch' because I am not changing tag field ! :/ 
                    url: '/api/vault/' + id + '/',
                    data: {
                        "site_url": Crypt.encrypt(ReactDOM.findDOMNode(this.refs.site_url).value, key, random),
                        "username": Crypt.encrypt(ReactDOM.findDOMNode(this.refs.username).value, key, random),
                        "email": Crypt.encrypt(ReactDOM.findDOMNode(this.refs.email).value, key, random),
                        "password": Crypt.encrypt(ReactDOM.findDOMNode(this.refs.password).value, key, random),
                        "note": Crypt.encrypt(ReactDOM.findDOMNode(this.refs.note).value, key, random),
                        "iv": forge.util.bytesToHex(random),
                        "salt": forge.util.bytesToHex(_salt),
                        "iteration": iteration,
                        "audit": ReactDOM.findDOMNode(this.refs.audit).checked,
                        "icon": Crypt.encrypt(ReactDOM.findDOMNode(this.refs.iconPicker).value, key, random)
                    },
                    headers: {
                        'Authorization': "JWT " + sessionStorage.getItem('token')
                    }
                }).then(function (data) {
                    console.log(data);
                    sweetAlert("Updated", "Vault updated", "success");
                    this.props.route.passwords.loaded = false;
                    browserHistory.push('/dashboard/all/');
                }.bind(this)).catch(function (error) {
                    console.error(error);
                    sweetAlert("Error", "An error occurred when updating vault!", "error");
                })
            }.bind(this), function(){

            });
    }

    tags() { // generate tags and button
        var bunny = [];
        if(this.props.route.passwords.password['tag']) {
            (this.props.route.passwords.password['tag']).map(function (data, index) {
                bunny.push(
                    <button className="btn btn-default" role="button" key={ index }>
                        #{data}
                    </button>
                )
            });
            return (
                <div> Tags: {bunny}
                    <hr/>
                    Created At : {this.props.route.passwords.password['created_at']} <br/>
                    Updated : {this.props.route.passwords.password['updated_at']}
                    <hr/>
                    <button className="btn btn-info" onClick={this.saveChanged.bind(this)} role="button">Save</button>

                    <button className="btn btn-danger"  onClick={this.deletePost.bind(this)}>Delete</button>
                </div>
            );
        }
    }

    render() {
        return(
            <div>
                <Helmet
                    title= 'Hiren-Vault: Password'
                />
                <div className="containe">
                    <div className="ro">
                        <form className="form-horizontal">
                            <div className="form-group" >
                                <label className="control-label col-sm-2" > URL </label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" ref="site_url" defaultValue={ this.props.route.passwords.password['site_url']}  />
                                    <a className="btn btn-default" target="_blank" href={this.props.route.passwords.password['site_url']}>
                                        <i className="fa fa-rocket" /> Launch Site </a>
                                </div>
                            </div>
                            <div className="form-group" >
                                <label className="control-label col-sm-2" > Username </label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" ref="username" defaultValue={ this.props.route.passwords.password['username']}  />
                                </div>
                            </div>
                            <div className="form-group" >
                                <label className="control-label col-sm-2" > Email </label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" ref="email" defaultValue={ this.props.route.passwords.password['email']} />
                                </div>
                            </div>
                            <div className="form-group" >
                                <label className="control-label col-sm-2"  > Password </label>
                                <div className="col-sm-10">
                                    <input className="form-control" ref="password" id="inputPassword" defaultValue={ this.props.route.passwords.password['password']} placeholder="Enter Password" />
                                    <br/>
                                    <button type="button" className="btn btn-info" id="generate" >Generate Password</button>
                                    Length <input type="number" min="5" max="100" defaultValue="20" id="range"/>
                                </div>

                            </div>
                            <div className="form-group" >
                                <label className="control-label col-sm-2" > Note </label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" ref="note" defaultValue={ this.props.route.passwords.password['note']} />
                                </div>
                            </div>
                            <div className="form-group" >
                                <label className="control-label col-sm-2"  > Iteration </label>
                                <div className="col-sm-10">
                                    <input className="form-control" ref='iteration' type="number" defaultValue={ this.props.route.passwords.password['iteration']} />
                                </div>
                            </div>
                            <div className="form-group" >
                                <label className="control-label col-sm-2"  > Icon </label>
                                <div className="col-sm-10">
                                    <input className="form-control " ref="iconPicker" defaultValue={ this.props.route.passwords.password['icon']} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <div className="checkbox">
                                        <label>
                                            {this.checkBox()}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                        {this.tags()}
                    </div>
                </div>
            </div>
        )
    }
}