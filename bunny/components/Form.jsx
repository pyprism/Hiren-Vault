import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';
import { browserHistory } from 'react-router';
import Crypt from '../utils/Crypt.jsx';

export default class Form extends React.Component {

    form(e){
        
    }

    render() {

        return (
            <div >
                <div className="row">
                    <Helmet
                        title="Hiren-Diary: Form"
                    />
                </div>

                <form className="form-horizontal" onSubmit={this.form.bind(this)}>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Post Type</label>
                        <div className="col-sm-10">
                            <select className="form-control " ref="postType" onChange={this.postType.bind(this)} required>
                                <option value="diary">Diary</option>
                                <option value="note">Note</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group" id="title">
                        <label className="control-label col-sm-2" >Title</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" ref="title" placeholder="Post Title"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Content</label>
                        <div className="col-sm-10">
                            <textarea id="summernote" ref="content" className="form-control" placeholder="Enter Content"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Date</label>
                        <div className='input-group date' id='datetimepicker'>
                            <input type='text' ref="date" className="form-control" />
                                    <span className="input-group-addon">
                                        <span className="glyphicon glyphicon-calendar" />
                                    </span>
                        </div>
                    </div>
                    <div className="form-group" >
                        <label className="control-label col-sm-2">Tags</label>
                        <div className="col-sm-10">
                            <input type="text" ref="tag" id="tags" required className="form-control input-lg" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default"><i className="fa fa-save" /> Save</button>
                        </div>
                    </div>
                </form>
            </div>
        )
}
}