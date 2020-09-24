import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers } from '../../actions/userActions';
import PropTypes from "prop-types";
import DeleteUserModal from './DeleteUserModal';
import UpdateUserModal from './UpdateUserModal';
import { Table} from "reactstrap";
import "./userList.css";


class UserList extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  onDeleteClick = (id) => {
    this.props.deleteNews(id);
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  renderUserTable() {
    return (
      <Table bordered hover>
        <thead>
          <tr>
            <th className="column">#</th>
            <th className="column">Name</th>
            <th className="column">Email</th>
            <th className="column">Role</th>
            <th className="column">Actions</th>
          </tr>
        </thead>
        <tbody>
        {this.renderRows()}
        </tbody>
      </Table>
    );
  }

  renderRows() {
    return this.props.users.users.map((user) => {
      return (
          <tr>
            <td className="column">{user.id}</td>
      <td className="column">{user.name}</td>
            <td className="column">{user.email}</td>
      <td className="column"> {user.role}</td>
            <td className="column">
              <div style={{display: "flex", flexDirection: "row" }}>
              <DeleteUserModal userId={user.id} userName={user.name} />
              <UpdateUserModal user={user} />
              </div>
            </td>
            
          </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <div style={{marginTop: "5rem"}}>{this.renderUserTable()}</div>
      </div>
    );
  }
}

UserList.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getAllUsers })(UserList);
