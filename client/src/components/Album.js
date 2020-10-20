import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { getImages } from "../actions/galleryActions";
import { Image } from "cloudinary-react";
import PropTypes from "prop-types";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading as HeadingTitle } from "./misc/Headings.js";
import Gallery from 'react-grid-gallery';
import ReactBnbGallery from 'react-bnb-gallery';
import 'react-bnb-gallery/dist/style.css';


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

const PHOTOS = [{
    photo: "http://res.cloudinary.com/trvstorage/image/upload/v1602697152/gallery/Content/photo_main_cropped_bj8kqk.png",

    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
  },
  {
    photo: "http://res.cloudinary.com/trvstorage/image/upload/v1602697885/gallery/Rudertag_18.08.2020/2009362_kybapg.jpg",

    thumbnail: "https://source.unsplash.com/c77MgFOt7e0/100x67",
  },];

  const IMAGES =
[{
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
      
},
{
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
        
},

{
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
       
}]


  

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
    isOpen: false,
    setIsOpen: false
  }



  

  renderGallery() {
    if (this.props.gallery.folders) {
      const foldersInput = this.props.gallery.folders;

      console.log("HELLO HERE ARE MY FOLDERS");
      console.log(foldersInput);

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
                    ></div>
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
    <Gallery images={pics}/>
    </div>
    )
 }

  
}

const mapStateToProps = (state) => ({
  gallery: state.gallery,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getImages })(Album);
