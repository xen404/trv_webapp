import React, { Component } from "react";
import { Image } from "cloudinary-react";
import PropTypes from "prop-types";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import DraftjsEditor from "./DraftjsEditor";
import styled from "styled-components";
import tw from "twin.macro";
import "./newsBoardCustom.css"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
  Media,
} from "reactstrap";
var parse = require('html-react-parser');


const ImageWrapper = styled.div((props) => [
  //`background-image: url("${props.imageSrc}");`,
 // tw`bg-cover bg-center h-80 lg:h-64 rounded rounded-b-none`,
]);
const Description = tw.p`mt-2 text-sm text-secondary-100`;
const Details = tw.div`p-6 pb-0 rounded border-2 border-t-0 rounded-t-none flex-1 flex flex-col items-center text-center lg:block lg:text-left`;


class NewsDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.DraftjsEditor = React.createRef();
  }

  state = {
    modal: false,
  };

  PropTypes = {
    news: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { news } = this.props;
  }

  toggle = () => {
    console.log("News details got toggled");
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    ///const textBody = convertFromRaw(JSON.parse(this.props.news.body));
    const propBody = this.props.news.body;
    const textBody1 = JSON.parse(propBody);
    try {
    const convertedBody = convertFromRaw(textBody1);
    const htmlBody = stateToHTML(convertedBody);
    } catch(err) {
      console.log(err);
    }
   // console.log(textBody);
   //<div dangerouslySetInnerHTML={{ __html: htmlBody }} />
    return (
      <div style={{ marginRight: "8px"}}>
        <Button
          color="dark"
          style={{ float: "left", display: "flex", backgroundColor: "black", borderRadius: "0px", paddingLeft: "20px", paddingRight: "20px" }}
          onClick={this.toggle}
        >
          
          More
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            {this.props.news.title}
          </ModalHeader>
          <ModalBody>
          <ImageWrapper>
                        <Image
                          key={this.props.news.image_url}
                          cloudName="trvStorage"
                          publicId={this.props.news.image_url}
                          crop="scale"
                          width="600"
                        />
                      </ImageWrapper>
                      <Details style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                        <Description>
                        {parse(htmlBody)}
                          </Description>
                        </div>
                        </Details>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  news: state.news,
});

export default NewsDetailsModal;