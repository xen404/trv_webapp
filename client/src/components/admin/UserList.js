import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers } from '../../actions/userActions';
import PropTypes from "prop-types";
import DeleteUserModal from './DeleteUserModal';
import UpdateUserModal from './UpdateUserModal';
import { Table} from "reactstrap";
import './userList.css';


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
            <th className="userTableColumn">#</th>
            <th className="userTableColumn">Name</th>
            <th className="userTableColumn">Email</th>
            <th className="userTableColumn">Role</th>
            <th className="userTableColumn">Actions</th>
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
            <td className="userTableColumn">{user.id}</td>
      <td className="userTableColumn">{user.name}</td>
            <td className="userTableColumn">{user.email}</td>
      <td className="userTableColumn"> {user.role}</td>
            <td className="userTableColumn">
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
