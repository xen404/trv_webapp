import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import "./App.css";
import { connect } from 'react-redux';
import { loadUser } from "../actions/authActions";
import "style.css"
import "tailwindcss/dist/base.css"
import AnimationRevealPage from "helpers/AnimationRevealPage"
//components
import AppNavbar from './AppNavbar';
import NavbarCustom from './NavbarCustom';
import Landing from './Landing';
import UserManagement  from './admin/UserManagement';
import SingleNewsPage from "./news/SingleNewsPage";
import NewsArchive from "./news/NewsArchive";
import TimeTable from './timeTable/TimeTable';
import PrivateRoute from './PrivateRoute';


class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
        <BrowserRouter>
          <Switch>
          <AnimationRevealPage disabled>
            <Route component={AppNavbar} />
            <Route exact path="/" component={Landing} />
            <PrivateRoute exact path="/admin" component={UserManagement} />
            <Route exact path="/news/archive" component={NewsArchive} />
            <PrivateRoute exact path="/time_table" component={TimeTable} />
            </AnimationRevealPage>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default connect(null, {loadUser})(App);
