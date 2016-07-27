import React from 'react';
import Helmet from "react-helmet";
import {Link} from 'react-router';
import { browserHistory } from 'react-router';


export default class Main extends React.Component {

    logout(){
        sessionStorage.clear();
        browserHistory.push('/');
    }

    componentDidMount() {
        $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
     $("#menu-toggle-2").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled-2");
        $('#menu ul').hide();
    });

     function initMenu() {
      $('#menu ul').hide();
      $('#menu ul').children('.current').parent().show();
      //$('#menu ul:first').show();
      $('#menu li a').click(
        function() {
          var checkElement = $(this).next();
          if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
            return false;
            }
          if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
            $('#menu ul:visible').slideUp('normal');
            checkElement.slideDown('normal');
            return false;
            }
          }
        );
      }
        $(document).ready(function() {initMenu();});
    }

    render() {
        return (
            <div>
                <Helmet
                    title="Hiren::Vault"
                    link={[
                    {"rel": "shortcut icon", "href": "/static/favicon.ico"},
                    {"rel": "stylesheet", "type": "text/css", "href": "/static/bower/bootstrap/dist/css/bootstrap.min.css"},
                    {"rel": "stylesheet", "type":"text/css", "href": "/static/css/simple-sidebar.css"},
                    {"rel": "stylesheet", "type": "text/css", "href": "/static/bower/font-awesome/css/font-awesome.min.css"},
                    {"rel": "stylesheet", "type": "text/css", "href": "/static/bower/sweetalert/dist/sweetalert.css"},
                    {"rel": "stylesheet", "type": "text/css", "href": "/static/bower/awesomplete/awesomplete.css"}
                ]}
                />

                <nav className="navbar navbar-default no-margin">
                    <div className="navbar-header fixed-brand">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"  id="menu-toggle">
                            <span className="glyphicon glyphicon-th-large" aria-hidden="true" />
                        </button>
                        <a className="navbar-brand" href="#">
                            <i className="fa fa-heartbeat fa-4" /> Hiren Vault</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className="active" ><button className="navbar-toggle collapse in" data-toggle="collapse" id="menu-toggle-2"> <span className="glyphicon glyphicon-th-large" aria-hidden="true" /></button></li>
                        </ul>
                    </div>
                </nav>

                <div id="wrapper">
                    <div id="sidebar-wrapper">
                        <ul className="sidebar-nav nav-pills nav-stacked" id="menu">
                            <li>
                                <Link to="/app/passwords/"><span className="fa-stack fa-lg pull-left"><i className="fa fa-key fa-stack-1x "/></span> Passwords</Link>
                                <ul className="nav-pills nav-stacked bunny">
                                    <li><Link to="/app/password/create"><span className="fa-stack fa-lg pull-left"><i className="fa fa-save fa-stack-1x "/></span> Save New Password</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/app/tags/" activeStyle={{ color: '#315561'}}> <span className="fa-stack fa-lg pull-left"><i className="fa fa-tags fa-stack-1x "/></span> Tags</Link>
                            </li>
                            <li>
                                <Link to="/app/recent/" activeStyle={{ color: '#315561'}}> <span className="fa-stack fa-lg pull-left"><i className="fa fa-cc-discover fa-stack-1x "/></span> Recent</Link>
                            </li>
                            <li>
                                <Link  to="#" activeStyle={{ color: '#315561'}} onClick= { this.logout }> <span className="fa-stack fa-lg pull-left"><i className="fa fa-sign-out fa-stack-1x "/></span> Log Out</Link>
                            </li>
                        </ul>
                    </div>
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row">
                                <div className="col-lg-12">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}