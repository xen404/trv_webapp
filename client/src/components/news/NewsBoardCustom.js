import React, { Component } from "react";
import { connect } from "react-redux";
import { getNews, deleteNews } from "../../actions/newsActions";
import { Image } from "cloudinary-react";
import PropTypes from "prop-types";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import tw from "twin.macro";
import DeleteNewsModal from "./DeleteNewsModal";
import NewsFormModal from "./NewsFormModal";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import { ReactComponent as ArrowLeftIcon } from "../../images/arrow-left-2-icon.svg";
import { ReactComponent as ArrowRightIcon } from "../../images/arrow-right-2-icon.svg";
import "slick-carousel/slick/slick.css";

import "./newsBoardCustom.css";

/*
    SLIDER CONSTS
*/

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
  ],
};

const Container = styled.div`
  ${tw`relative`}
  padding-top: 135px;
  padding-bottom: 135px;
  z-index: 1;
`;
const Content = tw.div`max-w-screen-xl mx-auto`;
const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const TestimonialSliderContainer = tw.div``;
const TestimonialSlider = styled(Slider)``;
const Testimonial = tw.div`flex! flex-col items-center md:items-stretch md:flex-row md:justify-center outline-none px-8`;

const SliderControlButtonContainer = styled.div`
  ${tw`absolute top-0 h-full flex items-end md:items-center z-20`}
  button {
    ${tw`text-secondary-500 hover:text-primary-500 focus:outline-none transition duration-300 transform hover:scale-125 transform -translate-y-2/3 md:translate-y-0`}
    svg {
      ${tw`w-8`}
    }
  }
`;

const NextArrow = ({ currentSlide, slideCount, ...props }) => (
  <SliderControlButtonContainer style={{ paddingLeft: 10 }} tw="right-0">
    <button {...props}>
      <ArrowRightIcon />
    </button>
  </SliderControlButtonContainer>
);
const PreviousArrow = ({ currentSlide, slideCount, ...props }) => (
  <SliderControlButtonContainer tw="left-0">
    <button {...props}>
      <ArrowLeftIcon />
    </button>
  </SliderControlButtonContainer>
);

/*
    CARDS CONSTS
*/

//const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const ThreeColumn = tw.div`flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap`;
const Column = tw.div``;

//const HeadingInfoContainer = tw.div`flex flex-col items-center`;
//const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-sm`;

const Card = tw.div`mx-4 xl:mx-8 max-w-sm flex flex-col h-full`;

const ImageWrapper = styled.div((props) => [
  //`background-image: url("${props.imageSrc}");`,
  //tw`bg-cover bg-center h-80 lg:h-64 rounded rounded-b-none`,
]);

const Details = tw.div`p-6 rounded border-2 border-t-0 rounded-t-none flex-1 flex flex-col items-center text-center lg:block lg:text-left`;

const Title = tw.h5`mt-4 leading-snug font-bold text-lg`;
const Description = tw.p`mt-2 text-sm text-secondary-100`;
/*const Link = styled(PrimaryButtonBase).attrs({ as: "a" })`
  ${tw`inline-block mt-4 text-sm font-semibold`}
`;
*/

class NewsBoardCustom extends Component {
  componentDidMount() {
    console.log("NewsBoardCustom did mount");
    this.props.getNews();
    const cardHeight = document.getElementsByClassName("slick-list");
    console.log(cardHeight);
    const height = cardHeight.clientHeight;
    this.setState({ height });
  }

  state = {
    height: null,
  };

  onDeleteClick = (id) => {
    this.props.deleteNews(id);
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    getNews: PropTypes.func.isRequired,
    news: PropTypes.object.isRequired,
  };

  renderNews() {
    if (this.props.news) {
      console.log(this.state.height);

      const newsInput = this.props.news.news;
      console.log("NEWS ORIGINAL");
      console.log(newsInput);

      var temparray = [];
      var i,
        j,
        chunk = 3;
      for (i = 0, j = newsInput.length; i < j; i += chunk) {
        if (newsInput.slice(i, i + chunk).length > 2) {
          temparray.push(newsInput.slice(i, i + chunk));
        }
      }
      console.log("TempArray");
      console.log(temparray);

      /*
      const slicedNews = newsInput.map((el, i, arr) => {
        const res = arr.slice(0, 3);
        return res;
      });
      */

      const slicedNews = temparray;

      console.log("SLICED NEWS ARRAY");
      console.log(slicedNews);

      return (
        <Content style={{marginBottom: "135px", marginTop: "135px"}}>
          <HeadingInfoContainer>
          <HeadingTitle style={{marginBottom: "90px", fontSize: "42px", lineHeight: "1.23", fontWeight: "700", color: "black"}}>News</HeadingTitle>
          </HeadingInfoContainer>
          <TestimonialSliderContainer>
            <TestimonialSlider
              nextArrow={<NextArrow />}
              prevArrow={<PreviousArrow />}
              {...settings}
            >
              {newsInput.map((news, index) => {
                return (
                  <Column className="column" key={index}>
                    <Card>
                      <ImageWrapper>
                        <Image
                          key={news.image_url}
                          cloudName="trvStorage"
                          publicId={news.image_url}
                          crop="scale"
                          width="600"
                          className="imageWrapper"
                        />
                      </ImageWrapper>
                      <Details>
                        <Title>{news.title}</Title>
                        <Description>{news.preview_text}</Description>
                      </Details>
                    </Card>
                  </Column>
                );
              })}
            </TestimonialSlider>
          </TestimonialSliderContainer>
          {this.props.isAuthenticated ? <NewsFormModal /> : <p></p>}
        </Content>
      );
    } else {
      return <div>FUUUUUUUUCK!</div>;
    }
  }

  render() {
    return <div>{this.renderNews()}</div>;
  }
}

const mapStateToProps = (state) => ({
  news: state.news,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getNews })(NewsBoardCustom);
