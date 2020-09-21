import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
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


class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
        <BrowserRouter>
          <div>
          <AnimationRevealPage disabled>
          
            <Route component={AppNavbar} />
            
            <Route exact path="/" component={Landing} />
            <Route exact path="/admin" component={UserManagement} />
            <Route exact path="/news/:id" component={SingleNewsPage} />
            </AnimationRevealPage>
          </div>
        </BrowserRouter>
    );
  }
}

export default connect(null, {loadUser})(App);
