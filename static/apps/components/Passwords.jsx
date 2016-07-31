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
	}

	componentDidMount = () => {
		

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