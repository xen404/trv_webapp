import React, { Component, useState, useCallback } from "react";
import { connect } from "react-redux";
import { getImages } from "../actions/galleryActions";
import { Image } from "cloudinary-react";
import PropTypes from "prop-types";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading as HeadingTitle } from "./misc/Headings.js";
import Carousel, { Modal, ModalGateway } from "react-images";

//import Gallery from 'react-grid-gallery';
import Gallery from "react-photo-gallery";
import ReactBnbGallery from "react-bnb-gallery";
import "react-bnb-gallery/dist/style.css";
import "./Album.css";

const Container = styled.div`
  ${tw`relative`}
  padding-top: 135px;
  padding-bottom: 135px;
  z-index: 1;
`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const Content = tw.div``;
const Card = tw.div`mx-4 xl:mx-8 max-w-sm flex flex-col h-full`;
const ImageWrapper = styled.div((props) => []);
const Details = tw.div`p-6 pb-0 rounded border-2 border-t-0 rounded-t-none flex-1 flex flex-col items-center text-center lg:block lg:text-left`;
const Title = tw.h5`mt-4 leading-snug font-bold text-lg`;
const Description = tw.p`mt-2 text-sm text-secondary-100`;



class Album extends Component {
  componentDidMount() {
    this.props.getImages(this.props.match.params.album);
    console.log("Album did mount");
    console.log(this.props);
  }

  

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    getFolders: PropTypes.func.isRequired,
    gallery: PropTypes.object.isRequired,
  };

  state = {
    viewerIsOpen: false,
    setViewerIsOpen: false,
    currentImage: 0,
    setCurrentImage: 0
  };

  openLightbox = (index) => {
    this.setState({currentImage: index})
    this.setState({viewerIsOpen: true})
  };

  closeLightbox = () => {
    this.setState({currentImage: 0})
    this.setState({viewerIsOpen: false})
  };
  

  /*
  render() {
    return <div>
        <h1 style={{marginTop: "50px"}}>{this.props.match.params.album}</h1>
        <>
        <button onClick={() => {
            console.log(this.state.setIsOpen)
            this.setState({setIsOpen: true})
            this.setState({isOpen: true})
            console.log(this.state.setIsOpen)}
            } >
                
          Open gallery
        </button>
        <ReactBnbGallery
          show={this.state.isOpen}
          photos={PHOTOS}
          onClose={() => {
            console.log(this.state.setIsOpen)
            this.setState({setIsOpen: false})
            this.setState({isOpen: false})
            console.log(this.state.setIsOpen)}}
        />
      </>
        </div>;
  }
  */

  render() {
    const pics = this.props.gallery.imgUrls;

    return (
      <div>
        <div>{this.props.match.params.album}</div>
        <div>
          <Gallery photos={pics} onClick={this.openLightbox} />
          <ModalGateway>
            {this.state.viewerIsOpen ? (
              <Modal onClose={this.closeLightbox}>
                <Carousel
                  views={pics.map((x) => ({
                    ...x,
                    srcset: x.srcSet,
                    caption: x.title,
                  }))}
                />
              </Modal>
            ) : null}
          </ModalGateway>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gallery: state.gallery,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getImages })(Album);
