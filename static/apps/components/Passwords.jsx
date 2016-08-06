import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';
import { browserHistory } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {encrypt, decrypt} from '../utils/pgp.js'
import {observer} from 'mobx-react';


@observer
export default class Passwords extends React.Component {

	constructor(props) {
		super(props);
		//this.props = this.props.bind(this);
		this.x = 4;
	}

	componentWillMount = () => {

		/*axios({
			method: 'get',
			url: '/api/vault/',
			headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
		}).then(function (response) {
			response.data.forEach(function(data) {
				let temp = {};
				temp['id'] = data.id;
				temp['site_url'] = data.site_url;
				temp['created_at'] = data.created_at;
				temp['updated_at'] = data.updated_at;
				[data.email, data.username, data.password, data.note].forEach(function(element, index, array) {
					console.log(element + "");
					//if(element + '' == 'data.email')
					//	console.log('email');
					//decrypt(sessionStorage.getItem('key'), element).then(function(decrypted) {
					//	console.log(decrypted);
				//	}).catch(function (error) {
     			//		console.error(error);
 				//	});
        			//console.log(z);
        		});
			});
		})
		.catch(function (response) {
			console.error(response);
			//sweetAlert("Oops!", response.data, "error");
		});*/

		this.props.routes[1].store.fetch();
	}

	render() {

		let bunny = [
		{
			'id' : 1,
			'date' : 's'
		},
		{
			'id' : 3,
			'date' : 'ssas'
		}
		];

		return (
			<div>
			<Helmet
			title="Vault-> Passwords"
			/>
			<BootstrapTable data={this.props.routes[1].store.bunny} striped={true} hover={true}>
			<TableHeaderColumn isKey={true} dataField="id">ID</TableHeaderColumn>
			<TableHeaderColumn dataField="updated_at">Date</TableHeaderColumn>
			</BootstrapTable>
			</div>
			)
	}
}