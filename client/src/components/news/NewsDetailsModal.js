import React, { Component } from "react";
import { Image } from "cloudinary-react";
import PropTypes from "prop-types";
import styled from "styled-components";
import tw from "twin.macro";
import "./newsBoardCustom.css";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

const ImageWrapper = styled.div((props) => []);
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

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    return (
      <div style={{ marginRight: "8px" }}>
        <Button
          color="dark"
          style={{
            float: "left",
            display: "flex",
            backgroundColor: "black",
            borderRadius: "0px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
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
            <Details
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <Description>{this.props.news.body}</Description>
              </div>
            </Details>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}



export default NewsDetailsModal;
