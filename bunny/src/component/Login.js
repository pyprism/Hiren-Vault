import React from "react";
import swal from "sweetalert2";
import "static/css/bootstrap.min.css";
import "static/css/materialize.css";
import "static/css/animate.min.css";
import "static/css/waves.min.css";
import "static/css/style.min.css";

export default class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            username: "",
            password: ""
        };
    }
    login(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/api-token-auth/',
            data: {
                'username': ReactDOM.findDOMNode(this.refs.username).value,
                'password': ReactDOM.findDOMNode(this.refs.password).value
            }
        }).then(function (response) {
            if (response.data['token']) {
                sessionStorage.setItem('token', response.data['token']);
                //browserHistory.push('/key/');
            }
        })
            .catch(function (response) {
                swal("Oops!", response.data.non_field_errors[0], "error");
            });

        this.resetForm();
    }

    resetForm(){
        this.setState = ({
            username: "",
            password: ""
        });
    }

    render() {

        const {username, password} = this.state;

        return (
            <div className="login-page">
                <div className="login-box">
                    <div className="logo">
                        <a href="https://github.com/pyprism/Hiren-Vault">Hiren-Vault</a>
                        <small>Password Manager</small>
                    </div>
                    <div className="card">
                        <div className="body">
                            <form id="sign_in" onSubmit={this.login.bind(this)}>
                                <div className="msg">Sign in to start your session</div>
                                <div className="input-group">
                        <span className="input-group-addon">
                            <i className="material-icons">person</i>
                        </span>
                                    <div className="form-line">
                                        <input type="text" className="form-control" name="username" autofocus value={username} placeholder="Username" required/>
                                    </div>
                                </div>
                                <div className="input-group">
                        <span className="input-group-addon">
                            <i className="material-icons">lock</i>
                        </span>
                                    <div className="form-line">
                                        <input type="password" className="form-control" name="password" value={password} placeholder="Password" required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="center-block">
                                            <button className="btn btn-block bg-pink waves-effect" type="submit">SIGN IN</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}