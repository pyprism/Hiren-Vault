import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';
import { browserHistory } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {encrypt, decrypt} from '../utils/pgp.js';


export default class Passwords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bunny: [],
            loaded: false
        }
    }

    componentDidMount = () => {
        (async function(){
            let bugs = await axios.get('/api/vault/', {
                headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
            });
            let hiren = [];
            let length = bugs.data.length;
            for(let i = 0; i < length; i++) {
            	let temp = {};
                temp['id'] = bugs.data[i]['id'];
                temp['site_url'] = bugs.data[i]['site_url'];
                temp['tag'] = bugs.data[i]['tag'];
                temp['email'] = await decrypt(sessionStorage.getItem('key'), bugs.data[i]['email']);
                temp['username'] = await decrypt(sessionStorage.getItem('key'), bugs.data[i]['username']);
                temp['password'] = await decrypt(sessionStorage.getItem('key'), bugs.data[i]['password']);
                temp['note'] = await decrypt(sessionStorage.getItem('key'), bugs.data[i]['note']);
                temp['created_at'] = new Date(bugs.data[i]['created_at']) + '';
                temp['updated_at'] = new Date(bugs.data[i]['updated_at']) + '';
                hiren.push(temp);
            }
            this.setState({bunny: hiren});
            this.setState({loaded: true});
        }.bind(this))();
    }

    render() {

        function anchor(cell, row){
            let a;
            if (cell.startsWith('http://'))
                a = cell.slice(7);
            else if (cell.startsWith('https://'))
                a = cell.slice(8);
            return '<a href=' + cell + ' target="_blank" >' + a + '</a>' ;
        }
        if(this.state.loaded) {
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
        return <div>loading and decrypting all data .... </div>
    }
}