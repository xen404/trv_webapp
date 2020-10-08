import React, { Component } from "react";
import { connect } from "react-redux";
import { getAppointmentCards } from "../../actions/appointmentActions";
import PropTypes from "prop-types";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import { Link } from "react-router-dom";
import { Card, Button, CardTitle, CardText } from "reactstrap";
import Slider from "react-slick";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import { ReactComponent as ArrowLeftIcon } from "../../images/arrow-left-2-icon.svg";
import { ReactComponent as ArrowRightIcon } from "../../images/arrow-right-2-icon.svg";
import "slick-carousel/slick/slick.css";
import './Cards.css'

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
  variableWidth: true,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
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
  <SliderControlButtonContainer  tw="right-0">
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

class CardSlider extends Component {
  componentDidMount() {
    console.log("CardSlider did mount");
    this.props.getAppointmentCards();
  }

  state = {
    height: null,
  };

  onDeleteClick = (id) => {
    this.props.deleteNews(id);
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    getAppointmentCards: PropTypes.func.isRequired,
    appointments: PropTypes.object.isRequired,
  };

  renderNews() {
    if (this.props.appointments.cards) {
      const cardsInput = this.props.appointments.cards;

      var first10Cards = cardsInput.slice(0, 9);

      /*
      const slicedNews = newsInput.map((el, i, arr) => {
        const res = arr.slice(0, 3);
        return res;
      });
      */

      const slicedNews = first10Cards;

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
              Rudertage
            </HeadingTitle>
          </HeadingInfoContainer>
          <TestimonialSliderContainer>
            <TestimonialSlider
              nextArrow={<NextArrow />}
              prevArrow={<PreviousArrow />}
              {...settings}
            >
              {first10Cards.map((card, index) => {
                const formatDate = new Date(card.date);
                const year = formatDate.getFullYear();
                const month = formatDate.getMonth();
                const date = formatDate.getDate();
                var day = formatDate.getDay();
                switch (day) {
                  case 1:
                    day = "Montag";
                    break;
                  case 3:
                    day = "Mittwoch";
                    break;
                  case 6:
                    day = "Samstag";
                    break;
                  default:
                    day = "wtf";
                }
                return (
                    <div style={{display: "flex", alignContent: "center"}}>
                  <Card
                    className="appointmentCard"
                    key={index}
                    body
                    inverse
                    style={{
                      backgroundColor: "white",
                      borderColor: "#333",
                      marginRight: "20px",
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <CardTitle style={{color: 'black'}}>
                        <b>
                      {day} {date}-{month}-{year}</b>
                      <br/>
                      <p><b>18:00</b></p>
                    </CardTitle>
                    <CardText style={{color: 'black'}}>{card.name}</CardText>
                  </Card>
                  </div>
                );
              })}
            </TestimonialSlider>
          </TestimonialSliderContainer>
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
  appointments: state.appointments,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getAppointmentCards })(CardSlider);
