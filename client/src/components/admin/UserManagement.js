import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserList from "./UserList";
import AddUserModal from "./AddUserModal";

class UserManagment extends Component {
  propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  render() {
    return (
      <div>
        <UserList />
        <AddUserModal />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(UserManagment);
