import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';

export default class Tags extends React.Component {
    editor(e){
        e.preventDefault();
        axios({
            method: 'post',
            url: '/api/tag/',
            data: {'name': ReactDOM.findDOMNode(this.refs.tag).value},
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
        }).then(function(response) {
            $.notify("Tag Created", "success");
        }).catch(function (err) {
            sweetAlert("Oops!", err.data.name[0], "error");
        });
    }

    render() {
        return (
            <div>
                <Helmet
                    title="Vault->Tags"
                />
                <form className="form col-md-12 center-block" onSubmit={this.editor.bind(this)} >
                    <div className="form-group">
                        <label >Create New Tag</label>
                        <input type="text" required ref="tag" className="form-control" placeholder="Tag"/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Save</button>
                    </div>
                </form>

            </div>
        )
    }

}