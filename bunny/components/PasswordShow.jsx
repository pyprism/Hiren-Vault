import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';
import { toJS } from "mobx";
import { browserHistory } from 'react-router';
import { observer } from "mobx-react";
import {Link} from 'react-router';


@observer
export default class PasswordShow extends React.Component {

    constructor(props) {
        super(props);
        this.props.route.passwords.vaultId = this.props.params.id;
        this.props.route.passwords.findVaultById();
    }

    componentDidMount() {
        //this.props.route.passwords.vaultId = this.props.params.id;
        //this.props.route.passwords.findVaultById();
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
        console.log('saved pressed');
    }

    tags() { // generate tags
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
                                <label className="control-label col-sm-2" > Password </label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" ref="password" defaultValue={ this.props.route.passwords.password['password']} />
                                </div>
                            </div>
                            <div className="form-group" >
                                <label className="control-label col-sm-2" > Note </label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" ref="note" defaultValue={ this.props.route.passwords.password['note']} />
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