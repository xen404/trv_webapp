import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { clearConfirm } from "../../actions/confirmActions";
import { updateUser } from "../../actions/userActions";
import { clearErrors } from "../../actions/errorActions";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";

class UpdateUserModal extends Component {
  state = {
    modal: false,
    name: this.props.user.name,
    email: this.props.user.email,
    password: "",
    role: "",
    msg: null,
    successMsg: null,
  };

  PropTypes = {
    users: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    confirm: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    clearConfirm: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, confirm } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_NEW_USER_FAIL") {
        this.props.clearConfirm();
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (confirm !== prevProps.confirm) {
      if (confirm.id === "USER_CREATED") {
        this.props.clearErrors();
        this.setState({ successMsg: confirm.successMsg });
      } else {
        this.setState({ successMsg: null });
      }
    }
  }

  toggle = () => {
    console.log("i got toggled");
    this.props.clearErrors();
    this.props.clearConfirm();
    this.clearForm();
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { password } = this.state;
    const id = this.props.user.id;
    const role = document.getElementById("role").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const updatedUser = {
      id,
      name,
      email,
      password,
      role,
    };

    console.log(updatedUser);

    this.props.updateUser(updatedUser);

    //this.toggle();
  };

  clearForm = () => {
    this.setState({
      name: "",
      email: "",
      password: "",
      role: "",
    });
  };

  render() {
    return (
      <div>
        <Button color="warning" size="sm" onClick={this.toggle}>
          Edit
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            {this.state.successMsg ? (
              <Alert color="success">{this.state.successMsg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  defaultValue={this.props.user.name}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter user's name"
                  onChange={this.onChange}
                />
                <Label for="email">Email</Label>
                <Input
                  defaultValue={this.props.user.email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter user's email"
                  onChange={this.onChange}
                />
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter new password"
                  onChange={this.onChange}
                />

                <Label for="exampleSelect">Role</Label>
                <Input
                  type="select"
                  name="role"
                  id="role"
                  onChange={this.onChange}
                  defaultValue={this.props.user.role}
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="EDITOR">EDITOR</option>
                </Input>

                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Update
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  error: state.error,
  confirm: state.confirm,
});

export default connect(mapStateToProps, {
  updateUser,
  clearErrors,
  clearConfirm,
})(UpdateUserModal);
