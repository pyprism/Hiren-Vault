import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';
import Crypt from '../utils/Crypt.jsx';


export default class Form extends React.Component {

    form = (e) =>{
        /***
         * Handle new password save
         */
        e.preventDefault();
        // key, salt generation
        let  random = forge.random.getBytesSync(32),
            _salt = forge.random.getBytesSync(128),
            iteration = ReactDOM.findDOMNode(this.refs.iteration).value,
            key = forge.pkcs5.pbkdf2(sessionStorage.getItem('key'), _salt, iteration, 32);

        // tag names processing
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

        axios({
            method: 'post',
            url: '/api/vault/',
            data: {
                'tag' : _tag,
                "site_url": Crypt.encrypt(ReactDOM.findDOMNode(this.refs.site_url).value, key, random),
                "username": Crypt.encrypt(ReactDOM.findDOMNode(this.refs.username).value, key, random),
                "email": Crypt.encrypt(ReactDOM.findDOMNode(this.refs.email).value, key, random),
                "password": Crypt.encrypt(ReactDOM.findDOMNode(this.refs.password).value, key, random),
                "note": Crypt.encrypt(ReactDOM.findDOMNode(this.refs.note).value, key, random),
                "iv": forge.util.bytesToHex(random),
                "salt": forge.util.bytesToHex(_salt),
                "iteration": iteration,
                "audit": ReactDOM.findDOMNode(this.refs.audit).value,
                "icon": Crypt.encrypt(ReactDOM.findDOMNode(this.refs.iconPicker).value, key, random)
            },
            headers: {
                'Authorization': "JWT " + sessionStorage.getItem('token')
            }
        }).then(function (response) {
            if(response.statusText === "Created") {
                sweetAlert("Saved", "Saved Successfully", "success");
                this.props.route.passwords.loaded = false;
                document.getElementById('form').reset();
            }
        }.bind(this)).catch(function (err) {
            if(err.statusText === 'Forbidden') {
                sweetAlert("Oops!", 'Token Expired, Log Out Please !', "error");
            }else {
                console.error(err);
                sweetAlert('Error', err.statusText, 'error');
            }
        })
    }


    componentDidMount() {

        let icon = ReactDOM.findDOMNode(this.refs.iconPicker);

        $(icon).iconpicker();  // initializing icon picker

        let tag = ReactDOM.findDOMNode(this.refs.tag);

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
                $(tag).selectize({
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

    render() {

        return (
            <div >
                <div className="row">
                    <Helmet
                        title="Hiren-Password: Form"
                    />
                </div>

                <form className="form-horizontal" id="form" onSubmit={this.form.bind(this)}>
                    <div className="form-group" >
                        <label className="control-label col-sm-2" > URL </label>
                        <div className="col-sm-10">
                            <input className="form-control" type="url" required autoFocus ref="site_url" placeholder="Site URL" />
                        </div>
                    </div>

                    <div className="form-group" >
                        <label className="control-label col-sm-2" > Username</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" ref="username" placeholder="Optional Username" />
                        </div>
                    </div>

                    <div className="form-group" >
                        <label className="control-label col-sm-2"  > Password </label>
                        <div className="col-sm-10">
                            <input className="form-control" ref="password" id="inputPassword" placeholder="Enter Password" />
                            <br/>
                            <button type="button" className="btn btn-info" id="generate" >Generate Password</button>
                            Length <input type="number" min="5" max="100" defaultValue="20" id="range"/>
                        </div>

                    </div>
                    <div className="form-group" >
                        <label className="control-label col-sm-2" > Email </label>
                        <div className="col-sm-10">
                            <input className="form-control" type="email" ref="email" placeholder="Optional Email" />
                        </div>
                    </div>
                    <div className="form-group" >
                        <label className="control-label col-sm-2" > Note </label>
                        <div className="col-sm-10">
                            <textarea className="form-control" rows="3" ref="note" placeholder="Optional Note" />
                        </div>
                    </div>
                    <div className="form-group" >
                        <label className="control-label col-sm-2"  > Iteration </label>
                        <div className="col-sm-10">
                            <input className="form-control" ref='iteration' type="number" defaultValue="2000" />
                        </div>
                    </div>
                    <div className="form-group" >
                        <label className="control-label col-sm-2"  > Icon </label>
                        <div className="col-sm-10">
                            <input className="form-control " ref="iconPicker"  />
                        </div>
                    </div>
                    <div className="form-group" >
                        <label className="control-label col-sm-2" > Tags</label>
                        <div className="col-sm-10">
                            <input className="form-control " ref="tag" />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" ref="audit" /> Enable Audit
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default" ><i className="fa fa-save" /> Save</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}