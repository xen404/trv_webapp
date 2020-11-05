import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import signUp from "images/icons/add-group.svg";
import schoolBag from "images/icons/bag.svg";
import uniHat from "images/icons/graduation-hat.svg";
import paddle from "images/icons/row.svg";
import support from "images/icons/support.svg";
import "./Prices.css";
import PriceListCollapse from "./PriceListCollapse";

const Container = styled.div`
  ${tw`relative`}
  padding-top: 0px;
  padding-bottom: 75px;
  z-index: 1;
`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center  max-w-screen-lg mx-auto`}
`;
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full text-center`;
const Description = tw(SectionDescription)`w-full text-center`;

const VerticalSpacer = tw.div`mt-10 w-full`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 max-w-sm`}
`;

const Card = styled.div`
  ${tw`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left h-full mx-4 px-2 py-8`}
  .imageContainer {
    ${tw`border text-center rounded-full p-5 flex-shrink-0`}
    img {
      ${tw`w-6 h-6`}
    }
  }

  .textContainer {
    ${tw`sm:ml-4 mt-4 sm:mt-2`}
  }

  .title {
    ${tw`mt-4 tracking-wide font-bold text-2xl leading-none`}
  }

  .description {
    ${tw`mt-1 sm:mt-4 font-medium text-secondary-100 leading-loose`}
  }
`;

const StepHeading = tw.h6`leading-none text-xl font-semibold`;


export default ({
  cards = null,
  heading = "Der Verein",
  subheading = "",
  description = "Der Tullner Ruderverein wurde 1971 gegründet und liegt an der Donau im Mündungsgebiet der Großen Tulln. Ca. 60 Mitglieder aller Altersgruppen betreiben Rudersport in familiärer Atmosphäre. Der TRV ist Mitglied des Österreichischen Ruderverbandes und der Sportunion Niederösterreich. Aliquam non magna tincidunt, gravida magna a, fringilla enim. Nullam eget urna et tortor gravida laoreet. Pellentesque aliquet commodo tellus eget auctor. Fusce eros lectus, efficitur sed tellus eu, tempus gravida nibh. In laoreet varius ante iaculis maximus. Phasellus arcu arcu, fermentum id justo in, malesuada dignissim libero. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec fringilla sem sed orci placerat laoreet. Etiam vitae ligula semper, vehicula felis sed, maximus magna. ",
}) => {
  /*
   * This componets has an array of object denoting the cards defined below. Each object in the cards array can have the key (Change it according to your need, you can also add more objects to have more cards in this feature component) or you can directly pass this using the cards prop:
   *  1) imageSrc - the image shown at the top of the card
   *  2) title - the title of the card
   *  3) description - the description of the card
   *  If a key for a particular card is not provided, a default value is used
   */

  const defaultCards = [
    {
      imageSrc: paddle,
      title: "Ausübendes Mitglied",
      description: " – EUR 165,–",
    },
    {
      imageSrc: support,
      title: "Studenten und Ehegatten",
      description: " – EUR 110,–",
    },
    {
      imageSrc: uniHat,
      title: "Schüler bis 18 Jahre",
      description: " – EUR 55,–",
    },
    {
      imageSrc: schoolBag,
      title: "Unterstützendes Mitglied",
      description: "  – EUR 55,–",
    },
    {
      imageSrc: signUp,
      title: "Einschreibgebühr",
      description: "Erwachsene – EUR 50,– " + " Jugendliche – EUR 10,–",
    },
  ];

  if (!cards) cards = defaultCards;

  return (
    <Container>
      <ThreeColumnContainer className="pricesColumn">
      
      {subheading && <Subheading></Subheading>}
        <div>
  <HeadingTitle style={{marginBottom: "", fontSize: "42px", lineHeight: "1.23", fontWeight: "700", color: "black"}}></HeadingTitle>
        {description && <Description></Description>}
        </div>
        


        {cards.map((card, i) => (
          <Column key={i}>
            <Card>
              <span style={{color: "black"}} className="imageContainer" style={{display: "flex", flexDirection: "column",}}>
                
              </span>
              <span className="textContainer">
                <StepHeading>{card.title || "Fully Secure"}</StepHeading>
                <p className="description">
                  {card.description}
                </p>
              </span>
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer>
    </Container>
  );
};
