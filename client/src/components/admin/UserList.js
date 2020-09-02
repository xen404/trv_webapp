import React, { Component } from "react";
import { connect } from "react-redux";
import { getNews, deleteNews} from "../../actions/newsActions";
import { getAllUsers } from '../../actions/userActions';
import { Image } from "cloudinary-react";
import PropTypes from "prop-types";
import DeleteUserModal from './DeleteUserModal';
import UpdateUserModal from './UpdateUserModal';
import { Table, Container, ListGroup, ListGroupItem, Button } from "reactstrap";

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
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {this.renderRows()}
        </tbody>
      </Table>
    );
  }

  renderRows() {
    const { users } = this.props.users;
    return this.props.users.users.map((user) => {
      return (
          <tr>
            <td>{user.id}</td>
      <td>{user.name}</td>
            <td>{user.email}</td>
      <td>{user.role}</td>
            <td>
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
        <div>{this.renderUserTable()}</div>
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
