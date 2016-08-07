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

	componentDidMount = () => {
		this.props.routes[1].store.fetch();
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

		return (
			<div>
			<Helmet
			title="Vault-> Passwords"
			/>
			<BootstrapTable data={toJS(this.props.routes[1].store.bunny)} striped={true} hover={true} condensed={true} pagination={true} search={true}>
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
}