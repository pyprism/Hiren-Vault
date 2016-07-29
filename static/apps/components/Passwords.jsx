import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';
import { browserHistory } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//import  PasswordsAjax  from '../ajax/passwords.js';
import {encrypt, decrypt} from '../utils/pgp.js'



export default class Passwords extends React.Component {

	constructor(props) {
		super(props);
		let temp_bunny = {};

		(function () {
			axios({
        method: 'get',
        url: '/api/vault/',
        headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
    }).then(function(response) {
    	this.temp_bunny.push(response.data);
    }.bind(this)).catch(function (err) {
    	console.error(err);
        //sweetAlert("Oops!", err.data, "error");
    }); 
		})();
	}

	componentDidMount() {
		

		//console.log(bunny);
	}

	render() {
		return (
			<div>
				<Helmet
                    title="Vault-> Passwords"
                />
				I am passwords
			</div>
			)
	}
}