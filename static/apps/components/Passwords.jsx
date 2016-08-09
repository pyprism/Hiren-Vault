import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';
import { browserHistory } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {encrypt, decrypt} from '../utils/pgp.js'
import {observer} from 'mobx-react';
import {toJS} from 'mobx';


@observer
export default class Passwords extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bunny : []
		}
	}

	componentDidMount = () => {
		(async function(){
			let bugs = await axios.get('/api/vault/', {
				headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
			});

			bugs.forEach(async data => {
				let temp = {};
        temp['id'] = data.id;
        temp['site_url'] = data.site_url;
        temp['tag'] = data.tag;
        temp['email'] = await decrypt(sessionStorage.getItem('key'), data.email);
        temp['username'] = await decrypt(sessionStorage.getItem('key'), data.username);
        temp['password'] = await decrypt(sessionStorage.getItem('key'), data.password);
        temp['note'] = await decrypt(sessionStorage.getItem('key'), data.note);
        temp['created_at'] = data.created_at;
        temp['updated_at'] = data.updated_at;

		})
			console.log(this.state.bunny);
		}.bind(this))();
		
		//this.props.routes[1].store.fetch();
	}

	render() {

		function anchor(cell, row){
			let a;
			if (cell.startsWith('http://'))
				a = cell.slice(7);
			else if (cell.startsWith('https://'))
				a = cell.slice(8);
			return '<a href=' + cell + '>' + a + '</a>' ;
		}
		if(this.state.bunny == []) {
			return (
				<div>
				<Helmet
				title="Vault-> Passwords"
				/>
				<BootstrapTable data={this.state.bunny} striped={true} hover={true} condensed={true} pagination={true} search={true}>
				<TableHeaderColumn dataField="id" isKey={true}>ID</TableHeaderColumn>
				<TableHeaderColumn dataField="site_url" dataFormat={anchor} dataSort={true}>URL</TableHeaderColumn>
				<TableHeaderColumn dataField="email">Email</TableHeaderColumn>
				<TableHeaderColumn dataField="username">Username</TableHeaderColumn>
				<TableHeaderColumn dataField="password">Password</TableHeaderColumn>
				<TableHeaderColumn dataField="note">Note</TableHeaderColumn>
				<TableHeaderColumn dataField="tag">Tag</TableHeaderColumn>
				<TableHeaderColumn dataField="created_at">Created At</TableHeaderColumn>
				<TableHeaderColumn dataField="updated_at">Updated At</TableHeaderColumn>
				</BootstrapTable>
				</div>
				)
		}
		return <div>loading.... </div>
	}
}