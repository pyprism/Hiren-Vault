import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';
import { browserHistory } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {encrypt, decrypt} from '../utils/pgp.js'



export default class Passwords extends React.Component {

	//constructor(props) {
	//	super(props);
	//}

	componentDidMount() {
		

		//console.log(bunny);
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
			<BootstrapTable data={bunny} striped={true} hover={true}>
				<TableHeaderColumn isKey={true} dataField="id">ID</TableHeaderColumn>
				<TableHeaderColumn dataField="date">date</TableHeaderColumn>
			</BootstrapTable>
			</div>
			)
	}
}