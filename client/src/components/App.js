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
import Landing from './Landing';
import UserManagement  from './admin/UserManagement';
import NewsArchive from "./news/NewsArchive";
import TimeTable from './timeTable/TimeTable';
import Gallery from "../components/gallery/Gallery";
import Album from "../components/gallery/Album";


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
            <Route exact path="/admin" component={UserManagement} />
            <Route exact path="/news/archive" component={NewsArchive} />
            <Route exact path="/time_table" component={TimeTable} />
            <Route exact path="/gallery" component={Gallery} />
            <Route exact path="/gallery/:album" component={Album} />
            </AnimationRevealPage>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default connect(null, {loadUser})(App);
