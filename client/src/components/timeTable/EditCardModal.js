import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { clearConfirm } from "../../actions/confirmActions";
import { registerNewUser } from "../../actions/userActions";
import { clearErrors } from "../../actions/errorActions";
import { updateAppointment } from "../../actions/appointmentActions";
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

class EditCardModal extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
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
      if (error.id === "UPDATE_CARD_FAIL") {
        this.props.clearConfirm();
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (confirm !== prevProps.confirm) {
      if (confirm.id === "CARD_UPDATED") {
        this.props.clearErrors();
        this.setState({ successMsg: confirm.successMsg });
      } else {
        this.setState({ successMsg: null });
      }
    }
  }

  toggle = () => {
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
    const { name, info, time } = this.state;
    var newDate = new Date(this.props.cardDateFormat);
    newDate.setHours(0, 0, 0, 0);
    const newCard = {
      id: this.props.cardId,
      name,
      date: newDate,
      info,
      time,
    };

    this.props.updateAppointment(newCard);
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
        <Button
          color="warning"
          style={{
            borderRadius: "0px",
          }}
          onClick={this.toggle}
        >
          Edit
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          {this.state.successMsg ? (
            <>
              <ModalHeader toggle={this.toggle}>
                <p style={{ textAlign: "center" }}></p>
              </ModalHeader>

              <Alert color="success">{this.state.successMsg}</Alert>
            </>
          ) : (
            <>
              <ModalHeader toggle={this.toggle}>
                {this.props.cardDay} {this.props.cardDate}-
                {this.props.cardMonth}-{this.props.cardYear}
              </ModalHeader>

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
                      type="text"
                      name="name"
                      id="name"
                      placeholder={this.props.cardName}
                      onChange={this.onChange}
                    />
                    <Label for="name">Info</Label>
                    <Input
                      type="text"
                      name="info"
                      id="info"
                      onChange={this.onChange}
                    />
                    <Label for="name">Anfangszeit</Label>
                    <Input
                      type="text"
                      name="time"
                      id="time"
                      placeholder={"18:00"}
                      onChange={this.onChange}
                    />

                    <Button color="dark" style={{ marginTop: "2rem" }} block>
                      Edit
                    </Button>
                  </FormGroup>
                </Form>
              </ModalBody>
            </>
          )}
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
  registerNewUser,
  clearErrors,
  clearConfirm,
  updateAppointment,
})(EditCardModal);
