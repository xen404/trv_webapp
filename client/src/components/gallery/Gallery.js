import React, { Component } from "react";
import { connect } from "react-redux";
import { getFolders } from "../../actions/galleryActions";
import { Image } from "cloudinary-react";
import PropTypes from "prop-types";
import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const Content = tw.div``;
const Card = tw.div`mx-4 xl:mx-8 max-w-sm flex flex-col h-full`;
const ImageWrapper = styled.div((props) => []);
const Details = tw.div`p-6 pb-0 rounded border-2 border-t-0 rounded-t-none flex-1 flex flex-col items-center text-center lg:block lg:text-left`;
const Title = tw.h5`mt-4 leading-snug font-bold text-lg`;

class Gallery extends Component {
  componentDidMount() {
    this.props.getFolders();
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    getFolders: PropTypes.func.isRequired,
    gallery: PropTypes.object.isRequired,
  };

  renderGallery() {
    if (this.props.gallery.folders) {
      const foldersInput = this.props.gallery.folders;

      return (
        <div>
          <HeadingInfoContainer>
            <HeadingTitle
              style={{
                marginTop: "60px",
                marginBottom: "0px",
                fontSize: "42px",
                lineHeight: "1.23",
                fontWeight: "700",
                color: "black",
              }}
            >
              Gallery
            </HeadingTitle>
          </HeadingInfoContainer>
          <Content
            style={{
              marginBottom: "135px",
              marginTop: "135px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "stretch",
            }}
          >
            {foldersInput.map((folder, index) => {
              return (
                <Card key={index} style={{ alignSelf: "stretch" }}>
                  <ImageWrapper>
                    <Image
                      key={folder.coverId}
                      cloudName="trvStorage"
                      publicId={folder.coverId}
                      crop="scale"
                      width="600"
                      className="imageWrapper"
                    />
                  </ImageWrapper>
                  <Details
                    className="newsCardDetails"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <Title>{folder.name}</Title>
                    </div>
                    <div
                      className="newsCardButtons"
                      style={{
                        marginBottom: "8px",
                        marginTop: "16px",
                        display: "flex",
                        flexDirection: "row",
                        alignContent: "space-between",
                      }}
                    >
                      <Link to={`/gallery/${folder.name}`}>
                        <button
                          className="downloadButton"
                          style={{
                            marginRight: "20px",
                            paddingLeft: "15px",
                            paddingRight: "15px",
                            backgroundColor: "black",
                            color: "white",
                            marginTop: "25px",
                          }}
                          onClick={this.downloadFormular}
                        >
                          <div
                            className="downloadButtonContent"
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                            }}
                          >
                            <b>Open</b>
                          </div>
                        </button>
                      </Link>
                    </div>
                  </Details>
                </Card>
              );
            })}
          </Content>
        </div>
      );
    } else {
      return <div>FUUUUUUUUCK!</div>;
    }
  }

  render() {
    return <div>{this.renderGallery()}</div>;
  }
}

const mapStateToProps = (state) => ({
  gallery: state.gallery,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getFolders })(Gallery);
