import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import "./App.css";
import { connect } from 'react-redux';
import { loadUser } from "../actions/authActions";
import store from '../index';
//components
import Header from "./Header";
import NewsDashboard from "./NewsDashboard";
import NewsAdd from "./news/NewsAdd";
import AppNavbar from './AppNavbar';
import UserManagement  from './admin/UserManagement';
import SingleNewsPage from "./news/SingleNewsPage";


class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <div >
        <BrowserRouter>
          <div>
            <Route component={AppNavbar} />
            <Route exact path="/" component={NewsDashboard} />
            <Route exact path="/news/add_new" component={NewsAdd} />
            <Route exact path="/admin" component={UserManagement} />
            <Route exact path="/news/:id" component={SingleNewsPage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, {loadUser})(App);
