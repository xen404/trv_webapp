import React, { Component } from "react";
import { Link } from "react-router-dom";
import NewsList from "./news/NewsList";
import NewsFormModal from './news/NewsFormModal';
import { connect } from 'react-redux';
import PropTypes from "prop-types";


class NewsDashboard extends Component {

    propTypes = {
       isAuthenticated: PropTypes.bool
    }

  render() {
    return (
      <div>
        <NewsList />
        <div className="fixed-action-btn">
        {this.props.isAuthenticated ? <NewsFormModal /> : <p></p> }
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default  connect(mapStateToProps, {})(NewsDashboard);
