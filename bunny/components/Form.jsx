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
                $('#tags').selectize({
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
                        <label className="control-label col-sm-2">Tags</label>
                        <div className="col-sm-10">
                            <input type="text" ref="tag" id="tags" required className="form-control input-lg" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default"><i className="fa fa-save" /> Save</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}