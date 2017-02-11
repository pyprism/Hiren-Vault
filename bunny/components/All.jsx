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
    render() {
        return (
            <div>
                i am ur "all"
            </div>
        )
    }
}