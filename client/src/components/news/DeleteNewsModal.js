import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { clearConfirm } from "../../actions/confirmActions";
import { deleteNews } from "../../actions/newsActions";
import { clearErrors } from "../../actions/errorActions";
import { Button, Modal, ModalHeader, ModalBody, Alert } from "reactstrap";

class DeleteNewsModal extends Component {
  state = {
    modal: false,
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

  componentDidUpdate(prevProps, prevState) {
    const { error, confirm } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "DELETE_NEWS_FAIL") {
        this.props.clearConfirm();
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (confirm !== prevProps.confirm) {
      if (confirm.id === "NEWS_DELETED") {
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
    this.setState({
      modal: !this.state.modal,
    });
  };

  onDeleteClick = (id) => {
    this.props.deleteNews(id);
  };

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          Delete
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          {this.state.successMsg ? (
            <>
              {" "}
              <ModalHeader toggle={this.toggle}>
                <p style={{ textAlign: "center" }}></p>
              </ModalHeader>
              <Alert color="success">{this.state.successMsg}</Alert>
            </>
          ) : (
            <>
              <ModalHeader toggle={this.toggle}>
                <p style={{ textAlign: "center" }}>
                  Delete news {this.props.newsTitle} ?
                </p>
              </ModalHeader>
              <ModalBody>
                {this.state.msg ? (
                  <Alert color="danger">{this.state.msg}</Alert>
                ) : null}
                {this.state.successMsg ? (
                  <Alert color="success">{this.state.successMsg}</Alert>
                ) : null}
              </ModalBody>
              <Button
                color="danger"
                onClick={this.onDeleteClick.bind(this, this.props.newsId)}
              >
                Delete
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
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
  deleteNews,
  clearErrors,
  clearConfirm,
})(DeleteNewsModal);
