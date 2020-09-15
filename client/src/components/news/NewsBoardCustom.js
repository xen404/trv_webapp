import React, { Component } from "react";
import { connect } from "react-redux";
import { getNews, deleteNews } from "../../actions/newsActions";
import { Image } from "cloudinary-react";
import PropTypes from "prop-types";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Slider from "react-slick";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import { ReactComponent as QuotesLeftIcon } from "../../images/quotes-l.svg";
import { ReactComponent as QuotesRightIcon } from "../../images/quotes-r.svg";
import { ReactComponent as ArrowLeftIcon } from "../../images/arrow-left-2-icon.svg";
import { ReactComponent as ArrowRightIcon } from "../../images/arrow-right-2-icon.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-4.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../images/svg-decorator-blob-5.svg";
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
const ImageContainer = styled.div`
  ${tw`md:mx-3 lg:mx-6 w-2/3 md:w-4/12 rounded flex items-center max-w-xs md:max-w-none`}
  img {
    ${tw`rounded`}
  }
`;
const TextContainer = tw.div`md:mx-3 lg:mx-6 md:w-6/12 py-4 flex flex-col justify-between`;
const QuoteContainer = tw.div`relative p-6 md:p-8 lg:p-10 mt-4 md:mt-0`;
const Quote = tw.blockquote`text-center md:text-left font-medium text-xl lg:text-2xl xl:text-3xl`;
const CustomerInfo = tw.div`px-5 lg:px-10 text-center md:text-left mt-4 md:mt-0`;
const CustomerName = tw.h5`font-bold text-lg lg:text-xl xl:text-2xl text-primary-500`;
const CustomerTitle = tw.p`font-medium text-sm`;

const QuotesLeft = tw(
  QuotesLeftIcon
)`w-8 h-8 lg:w-10 lg:h-10 text-primary-500 absolute top-0 left-0`;
const QuotesRight = tw(
  QuotesRightIcon
)`w-8 h-8 lg:w-10 lg:h-10 text-primary-500 absolute bottom-0 right-0`;

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

const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`absolute w-32 top-0 left-0 -z-10 text-primary-500 opacity-25 transform -translate-x-full`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob2
)`absolute w-32 bottom-0 right-0 -z-10 text-pink-500 opacity-15 transform translate-x-2/3 translate-y-8`;

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
const MetaContainer = tw.div`flex items-center`;
const Meta = styled.div`
  ${tw`text-secondary-100 font-medium text-sm flex items-center leading-none mr-6 last:mr-0`}
  svg {
    ${tw`w-4 h-4 mr-1`}
  }
`;

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
    const slicedNews = this.props.news.news.map((el, i, arr) => {
      const res = arr.splice(0, 3);
      const tempArr = [...arr];
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
                        const textBody = convertFromRaw(JSON.parse(news.body));
                        const htmlBody = stateToHTML(textBody);
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
                                <Link href={news.url}>Read Post</Link>
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
