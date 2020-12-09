import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Alert,
  Button,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { updateCalendar } from "../../actions/appointmentActions";
import { clearConfirm } from "../../actions/confirmActions";
import { clearErrors } from "../../actions/errorActions";

class RowingDays extends Component {
  state = {
    modal: false,
    cardsAmount: null,
    time: null,
    rowingdays: [],
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
      if (error.id === "UPDATE_CALENDAR_FAIL") {
        this.props.clearConfirm();
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (confirm !== prevProps.confirm) {
      if (confirm.id === "CALENDAR_UPDATED") {
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

  handleCheckboxChange = (event) => {
    let newArray = [...this.state.rowingdays, event.target.id];
    if (this.state.rowingdays.includes(event.target.id)) {
      newArray = newArray.filter((day) => day !== event.target.id);
    }
    this.setState({
      rowingdays: newArray,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { rowingdays } = this.state;
    const cardsAmount = document.getElementById("cardsAmount").value;
    const time = document.getElementById("time").value;

    rowingdays.sort((a, b) => a - b);
    const newCalendar = {
      rowingdays: rowingdays,
      cardsAmount: cardsAmount,
      time: time,
    };

    this.props.updateCalendar(newCalendar);
  };

  clearForm = () => {
    this.setState({
      rowingdays: [],
      cardsAmount: null,
      time: null,
    });
  };

  render() {
    return (
      <div>
        <Button
          color="primary"
          style={{
            borderRadius: "0px",
          }}
          onClick={this.toggle}
        >
          Edit Calendar
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
              <ModalHeader toggle={this.toggle}>Kalendar</ModalHeader>

              <ModalBody>
                <Alert color="warning">
                  Achtung! Nachdem Submit werden alle Termineinträge gelöscht!
                </Alert>
                {this.state.msg ? (
                  <Alert color="danger">{this.state.msg}</Alert>
                ) : null}
                {this.state.successMsg ? (
                  <Alert color="success">{this.state.successMsg}</Alert>
                ) : null}

                <Form onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label for="cardsAmount">Anzahl Rudertage</Label>

                    <Input
                      type="number"
                      name="cardsAmount"
                      id="cardsAmount"
                      defaultValue="20"
                      onChange={this.onChange}
                    />

                    <Label for="time">Anfangszeit</Label>

                    <Input
                      type="text"
                      name="time"
                      id="time"
                      defaultValue="18:00"
                      placeholder="18:00"
                      onChange={this.onChange}
                    />

                    <Label for="Checkbox">Tage</Label>
                    <div>
                      <CustomInput
                        type="checkbox"
                        id="1"
                        name="weekday1"
                        label="Montag"
                        value="1"
                        onChange={this.handleCheckboxChange}
                      />
                      <CustomInput
                        type="checkbox"
                        id="2"
                        name="weekday2"
                        label="Dienstag"
                        value="2"
                        onChange={this.handleCheckboxChange}
                      />
                      <CustomInput
                        type="checkbox"
                        id="3"
                        name="weekday3"
                        label="Mittwoch"
                        value="3"
                        onChange={this.handleCheckboxChange}
                      />
                      <CustomInput
                        type="checkbox"
                        id="4"
                        name="weekday4"
                        label="Donnerstag"
                        value="4"
                        onChange={this.handleCheckboxChange}
                      />
                      <CustomInput
                        type="checkbox"
                        id="5"
                        name="weekday5"
                        label="Freitag"
                        value="5"
                        onChange={this.handleCheckboxChange}
                      />
                      <CustomInput
                        type="checkbox"
                        id="6"
                        name="weekday6"
                        label="Samstag"
                        value="6"
                        onChange={this.handleCheckboxChange}
                      />
                      <CustomInput
                        type="checkbox"
                        id="0"
                        name="weekday7"
                        label="Sonntag"
                        value="0"
                        onChange={this.handleCheckboxChange}
                      />
                    </div>
                    <Button color="dark" style={{ marginTop: "2rem" }} block>
                      Submit
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
  appointments: state.appointments,
  error: state.error,
  confirm: state.confirm,
});

export default connect(mapStateToProps, {
  clearErrors,
  clearConfirm,
  updateCalendar,
})(RowingDays);
