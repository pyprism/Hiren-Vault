import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';
import { toJS } from "mobx";
import { browserHistory } from 'react-router';
import { observer } from "mobx-react";
import {Link} from 'react-router';

@observer
export default class All extends React.Component {

    componentDidMount(){
        this.props.route.passwords.getData();

        // table conf
        $('#table').bootstrapTable({
            pagination: true,
            pageSize: 22,
            search: true,
            sortable: true,
            columns: [{
                field: 'id',
                title: 'ID'
            }, {
                field: 'site_url',
                title: 'URL'
            }, {
                field: 'email',
                title: 'Email'
            }, {
                field: 'username',
                title: 'Username'
            }, {
                field: 'created_at',
                title: 'Created At'
            }],
            data: toJS(this.props.route.passwords.passwords),
            onClickCell: function (field, value, row, $element) {
                if(field == 'site_url'){
                    //return '<a target="_blank" href=' + value + '>'+ value + '</a>' ;
                     //var win = window.open(value, '_blank');
                    //window.open(value, '_blank');
                    //win.focus();
                    browserHistory.push('/dashboard/' + row['id'] + '/');
                }
            }
        });
    }

    render() {
        if(this.props.route.passwords.loaded){
            return(
                <div>
                    <Helmet
                        title="Hiren-Vault: All Passwords"
                    />
                    <table id="table"></table>
                </div>
            )} else {
            return (
                <div>
                    <h3>{this.props.route.passwords.loadingText} </h3>
                </div>
            )
        }
    }
}