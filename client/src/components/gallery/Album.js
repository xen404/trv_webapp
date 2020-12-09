import React, { Component } from "react";
import { connect } from "react-redux";
import { getImages } from "../../actions/galleryActions";
import PropTypes from "prop-types";
import tw from "twin.macro";
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import Carousel, { Modal, ModalGateway } from "react-images";

import Gallery from "react-photo-gallery";
import "react-bnb-gallery/dist/style.css";
import "./Album.css";

const HeadingInfoContainer = tw.div`flex flex-col items-center`;

class Album extends Component {
  componentDidMount() {
    this.props.getImages(this.props.match.params.album);
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
    setCurrentImage: 0,
  };

  openLightbox = (e, { photo, index }) => {
    this.setState({ currentImage: index });
    this.setState({ viewerIsOpen: true });
  };

  closeLightbox = () => {
    this.setState({ currentImage: 0 });
    this.setState({ viewerIsOpen: false });
  };

  render() {
    const pics = this.props.gallery.imgUrls;

    return (
      <div>
        <HeadingInfoContainer>
          <HeadingTitle
            style={{
              marginTop: "60px",
              marginBottom: "90px",
              fontSize: "42px",
              lineHeight: "1.23",
              fontWeight: "700",
              color: "black",
            }}
          >
            {this.props.match.params.album}
          </HeadingTitle>
        </HeadingInfoContainer>

        <div>
          <Gallery photos={pics} onClick={this.openLightbox} />
          <ModalGateway>
            {this.state.viewerIsOpen ? (
              <Modal onClose={this.closeLightbox}>
                <Carousel
                  currentIndex={this.state.currentImage}
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
