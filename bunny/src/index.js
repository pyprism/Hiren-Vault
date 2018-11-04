import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from "react-router-dom";
import App from './App';
import Login from "components/pages/Login";
import Register from "components/pages/Register";
import * as serviceWorker from './serviceWorker';

class Index extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/music" component={App} />
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
