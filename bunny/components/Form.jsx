import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';
import { browserHistory } from 'react-router';
import Crypt from '../utils/Crypt.jsx';
import NewPasswordForm from '../models/forms/NewPasswordForm';
import { observer } from "mobx-react";


@observer
export default class Form extends React.Component {

    form(e){
        /***
         * Handle post save
         */
        e.preventDefault();
        console.log('hit');
        // key, salt generation
        let  random = forge.random.getBytesSync(32),
            _salt = forge.random.getBytesSync(128),
            key = forge.pkcs5.pbkdf2(sessionStorage.getItem('key'), _salt, 1500, 32);

        var tagStr = ReactDOM.findDOMNode(this.refs.tag).value;
        var _tag =[];
        var len = tagStr.length;
        var hiren;
        var x = "";
        for( hiren=0; hiren<len; hiren++) {
            if(tagStr[hiren] != ";"){
                x = x + tagStr[hiren];
                if( hiren + 1 == len)
                    _tag.push(x);
            }
            else{
                _tag.push(x);
                x = "";
            }
        }
    }

    componentDidMount() {

        $('.iconPicker').iconpicker();

        (function () { // function for selectize
            axios.get('/api/tags/', {
                headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
            }).then(function (response) {
                let nisha = [];
                response.data.map(function (hiren) {
                    let bunny = {'value': '', 'text': ''};
                    bunny['value'] = hiren.name;
                    bunny['text'] = hiren.name;
                    nisha.push(bunny);
                });
                $('.tag').selectize({
                    delimiter: ';',
                    persist: false,
                    options: nisha,
                    create: function(input) {
                        return {
                            value: input,
                            text: input
                        }
                    }
                })
            }).catch(function (error) {
                console.error(error);
            })
        })();

    }

    render() {

        return (
            <div >
                <div className="row">
                    <Helmet
                        title="Hiren-Password: Form"
                    />
                </div>

                <form className="form-horizontal" >
                    <div className="form-group" >
                        <label className="control-label col-sm-2" htmlFor={NewPasswordForm.$('site_url').id} > {NewPasswordForm.$('site_url').label} </label>
                        <div className="col-sm-10">
                            <input className="form-control" {...NewPasswordForm.$('site_url').bind()} />
                            <span className='error text-danger' >{NewPasswordForm.$('site_url').error}</span>
                        </div>
                    </div>

                    <div className="form-group" >
                        <label className="control-label col-sm-2" htmlFor={NewPasswordForm.$('username').id} > {NewPasswordForm.$('username').label} </label>
                        <div className="col-sm-10">
                            <input className="form-control" {...NewPasswordForm.$('username').bind()} />
                            <span className='error text-danger' >{NewPasswordForm.$('username').error}</span>
                        </div>
                    </div>

                    <div className="form-group" >
                        <label className="control-label col-sm-2" htmlFor={NewPasswordForm.$('password').id} > {NewPasswordForm.$('password').label} </label>
                        <div className="col-sm-10">
                            <input className="form-control" {...NewPasswordForm.$('password').bind()} />
                            <span className='error text-danger' >{NewPasswordForm.$('password').error}</span>
                        </div>
                    </div>
                    <div className="form-group" >
                        <label className="control-label col-sm-2" htmlFor={NewPasswordForm.$('email').id} > {NewPasswordForm.$('email').label} </label>
                        <div className="col-sm-10">
                            <input className="form-control" {...NewPasswordForm.$('email').bind()} />
                            <span className='error text-danger' >{NewPasswordForm.$('email').error}</span>
                        </div>
                    </div>
                    <div className="form-group" >
                        <label className="control-label col-sm-2" htmlFor={NewPasswordForm.$('note').id} > {NewPasswordForm.$('note').label} </label>
                        <div className="col-sm-10">
                            <textarea className="form-control" {...NewPasswordForm.$('note').bind()} rows="3" />
                            <span className='error text-danger' >{NewPasswordForm.$('note').error}</span>
                        </div>
                    </div>
                    <div className="form-group" >
                        <label className="control-label col-sm-2" htmlFor={NewPasswordForm.$('iteration').id} > {NewPasswordForm.$('iteration').label} </label>
                        <div className="col-sm-10">
                            <input className="form-control" {...NewPasswordForm.$('iteration').bind()} />
                            <span className='error text-danger' >{NewPasswordForm.$('iteration').error}</span>
                        </div>
                    </div>
                    <div className="form-group" >
                        <label className="control-label col-sm-2" htmlFor={NewPasswordForm.$('icon').id} > {NewPasswordForm.$('icon').label} </label>
                        <div className="col-sm-10">
                            <input className="form-control iconPicker" {...NewPasswordForm.$('icon').bind()} />
                            <span className='error text-danger' >{NewPasswordForm.$('icon').error}</span>
                        </div>
                    </div>
                    <div className="form-group" >
                        <label className="control-label col-sm-2" htmlFor={NewPasswordForm.$('tag').id} > {NewPasswordForm.$('tag').label} </label>
                        <div className="col-sm-10">
                            <input className="form-control tag" {...NewPasswordForm.$('tag').bind()} />
                            <span className='error text-danger' >{NewPasswordForm.$('tag').error}</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" {...NewPasswordForm.$('audit').bind()} /> Enable Audit
                                    <span className='error text-danger' >{NewPasswordForm.$('audit').error}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default" onClick={NewPasswordForm.onSubmit}><i className="fa fa-save" /> Save</button>
                        </div>
                    </div>
                </form>
            </div>
    )
    }
    }