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
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import { ReactComponent as ArrowLeftIcon } from "../../images/arrow-left-2-icon.svg";
import { ReactComponent as ArrowRightIcon } from "../../images/arrow-right-2-icon.svg";
import "slick-carousel/slick/slick.css";

/*
    SLIDER CONSTS
*/

const Container = tw.div`relative`;
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
const Column = tw.div`mt-24 lg:w-1/3`;

//const HeadingInfoContainer = tw.div`flex flex-col items-center`;
//const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-sm`;

const Card = tw.div`lg:mx-4 xl:mx-8 max-w-sm flex flex-col h-full`;

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

class NewsList extends Component {
  componentDidMount() {
    console.log("component did mount");
    this.props.getNews();
  }

  onDeleteClick = (id) => {
    this.props.deleteNews(id);
  };

  propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  renderNews() {
      if(this.props.news) {
    const slicedNews = this.props.news.news.map((el, i, arr) => {
      const res = arr.splice(0, 3);
      return res;
    });

    return (
      <Content>
           <HeadingInfoContainer>
                      <HeadingTitle>NEWS</HeadingTitle>
                    </HeadingInfoContainer>
        <TestimonialSliderContainer>
          <TestimonialSlider
            nextArrow={<NextArrow />}
            prevArrow={<PreviousArrow />}
          >
            {slicedNews.map((news, index) => (
              <Testimonial key={index}>
                <Container>
                  <Content>
                    <ThreeColumn>
                      {news.map((news, index) => {
                        //const textBody = convertFromRaw(JSON.parse(news.body));
                        //const htmlBody = stateToHTML(textBody);
                        return (
                          <Column key={index}>
                            <Card>
                              <ImageWrapper>
                                <Image
                                  key={news.image_url}
                                  cloudName="trvStorage"
                                  publicId={news.image_url}
                                  crop="scale"
                                  width="600"
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
                    </ThreeColumn>
                  </Content>
                </Container>
              </Testimonial>
            ))}
          </TestimonialSlider>
        </TestimonialSliderContainer>
      </Content>
    );
                    }
                    else {
                        return(
                            <div>
                                FUUUUUUUUCK!
                            </div>
                        )
                    }
  }

  render() {
    console.log("NEWSLISTCUSTOM!!!!");
    console.log(this.props.news);

    return <div>{this.renderNews()}</div>;
  }
}

NewsList.propTypes = {
  getNews: PropTypes.func.isRequired,
  news: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  news: state.news,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getNews, deleteNews })(NewsList);
