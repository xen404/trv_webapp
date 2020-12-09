import React, { Component } from "react";
import { connect } from "react-redux";
import { addNews } from "../../actions/newsActions";
import { clearConfirm } from "../../actions/confirmActions";
import { clearErrors } from "../../actions/errorActions";
import PropTypes from "prop-types";
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

class NewsFormModal extends Component {
  constructor(props) {
    super(props);
    this.DraftjsEditor = React.createRef();
  }

  state = {
    modal: false,
    title: "",
    preview_text: "",
    body: "",
    image_url: "",
    msg: null,
    successMsg: null,
    loadingMsg: null,
  };

  PropTypes = {
    news: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    confirm: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    clearConfirm: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, confirm, news } = this.props;

    if (news !== prevProps.news) {
      if (news.loading) {
        this.setState({ loadingMsg: "Loading..." });
      } else {
        this.setState({ loadingMsg: null });
      }
    }

    if (error !== prevProps.error) {
      if (error.id === "ADD_NEWS_FAIL") {
        this.props.clearConfirm();
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (confirm !== prevProps.confirm) {
      if (confirm.id === "NEWS_CREATED") {
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

  clearForm = () => {
    this.setState({
      title: "",
      preview_text: "",
      body: "",
      role: "",
      image_url: "",
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({ image_url: reader.result });
    };
  };

  previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({ image_url: reader.result });
    };
  };

  onSubmit = (e) => {
    e.preventDefault();

    //const editorContentRaw = this.DraftjsEditor.current.state.editorContentRaw;

    const newNews = {
      title: this.state.title,
      preview_text: this.state.preview_text,
      body: this.state.body,
      image_url: this.state.image_url,
    };
    this.props.addNews(newNews);
  };

  render() {
    return (
      <div style={{ marginTop: "2rem" }}>
        <Button
          color="dark"
          style={{ marginButtom: "2rem" }}
          onClick={this.toggle}
        >
          Add News
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add News</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            {this.state.successMsg ? (
              <Alert color="success">{this.state.successMsg}</Alert>
            ) : null}
            {this.state.loadingMsg ? (
              <Alert color="warning">{this.state.loadingMsg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="News title"
                  onChange={this.onChange}
                />
                <Label for="preview_text">Text preview</Label>
                <Input
                  type="text"
                  name="preview_text"
                  id="preview_text"
                  placeholder="Text preview of news"
                  onChange={this.onChange}
                />
                <Label for="body">Body</Label>
                <Input
                  type="textarea"
                  name="body"
                  id="body"
                  placeholder="Body content"
                  onChange={this.onChange}
                />
                <Label for="image_url">Image</Label>
                <Input
                  type="file"
                  name="image_url"
                  id="image_url"
                  onChange={this.handleFileInputChange}
                  value={this.state.fileInputState}
                />
                {this.state.image_url && (
                  <img
                    src={this.state.image_url}
                    alt="chosen"
                    style={{ height: "300px" }}
                  />
                )}
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Submit
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
  news: state.news,
  error: state.error,
  confirm: state.confirm,
});

export default connect(mapStateToProps, { addNews, clearErrors, clearConfirm })(
  NewsFormModal
);
