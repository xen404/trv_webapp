import React, { Component } from "react";
import { connect } from "react-redux";
import { getNews } from "../../actions/newsActions";
import { Image } from "cloudinary-react";
import PropTypes from "prop-types";
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
import NewsDetailsModal from "./NewsDetailsModal";
import { NavLink } from "reactstrap";

/*
    SLIDER CONSTS
*/

var settingsWideScreen = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
};

var settingsSmallScreen = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
};

const Content = tw.div`max-w-screen-xl mx-auto`;
const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const TestimonialSliderContainer = tw.div``;
const TestimonialSlider = styled(Slider)``;

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

const Column = tw.div``;

const Card = tw.div`mx-4 xl:mx-8 max-w-sm flex flex-col h-full`;

const ImageWrapper = styled.div((props) => []);

const Details = tw.div`p-6 pb-0 rounded border-2 border-t-0 rounded-t-none flex-1 flex flex-col items-center text-center lg:block lg:text-left`;

const Title = tw.h5`mt-4 leading-snug font-bold text-lg`;
const Description = tw.p`mt-2 text-sm text-secondary-100`;

class NewsBoardCustom extends Component {
  componentDidMount() {
    this.props.getNews();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  }

  constructor(props) {
    super(props);
    this.state = { windowWidth: window.innerWidth };
  }

  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
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
      const newsInput = this.props.news.news;

      var temparray = [];
      var i,
        j,
        chunk = 3;
      for (i = 0, j = newsInput.length; i < j; i += chunk) {
        if (newsInput.slice(i, i + chunk).length > 2) {
          temparray.push(newsInput.slice(i, i + chunk));
        }
      }

      var sliderSettings;
      if (this.state.windowWidth > 768) {
        sliderSettings = settingsWideScreen;
      } else {
        sliderSettings = settingsSmallScreen;
      }

      return (
        <Content style={{ marginBottom: "135px", marginTop: "135px" }}>
          <HeadingInfoContainer>
            <HeadingTitle
              style={{
                marginBottom: "90px",
                fontSize: "42px",
                lineHeight: "1.23",
                fontWeight: "700",
                color: "black",
              }}
            >
              News
            </HeadingTitle>
          </HeadingInfoContainer>
          <TestimonialSliderContainer>
            <TestimonialSlider
              nextArrow={<NextArrow />}
              prevArrow={<PreviousArrow />}
              {...sliderSettings}
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
                      <Details
                        className="newsCardDetails"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <div>
                          <Title>{news.title}</Title>
                          <Description>{news.preview_text}</Description>
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
                          <NewsDetailsModal news={news} />
                          {this.props.isAuthenticated ? (
                            <DeleteNewsModal newsId={news.id} />
                          ) : (
                            ""
                          )}
                        </div>
                      </Details>
                    </Card>
                  </Column>
                );
              })}
            </TestimonialSlider>
          </TestimonialSliderContainer>
          {this.props.isAuthenticated ? <NewsFormModal /> : ""}
          <button
            className="downloadButton"
            style={{
              marginRight: "20px",
              paddingLeft: "45px",
              paddingRight: "45px",
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
              <NavLink href="/news/archive">
                <b>Archive</b>
              </NavLink>
            </div>
          </button>
        </Content>
      );
    } else {
      return <div>FUUUUUUUUCK!</div>;
    }
  }

  render() {
    return <section id="newsSlider">{this.renderNews()}</section>;
  }
}

const mapStateToProps = (state) => ({
  news: state.news,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getNews })(NewsBoardCustom);
