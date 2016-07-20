import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';
import { browserHistory } from 'react-router';


export default class PasswordForm extends React.Component {

    editor(e){
        (async function () {
            e.preventDefault();
        })();
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
            var input = document.getElementsByClassName("tag");
            new Awesomplete(input, {
                list: ["Ada", "Java", "JavaScript", "Brainfuck", "LOLCODE", "Node.js", "Ruby on Rails"]
            });
        })();
    }

    render() {
        return (
            <div>
                <Helmet
                    title="Vault::Save Password"
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
                        <input type="text"  ref="tag" className="form-control awesomplete tag" />
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
                        <div className='input-group date' id='datetime' >
                            <div className="input-group-addon">
                                <span className="glyphicon glyphicon-calendar" />
                            </div>
                            <input type='text' className="form-control" ref="date" required  placeholder="Date"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Save</button>
                    </div>
                </form>

            </div>
        )
    }
}