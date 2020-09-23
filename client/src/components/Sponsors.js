import React from "react";
import tw from "twin.macro";
import { SectionHeading as HeadingTitle } from "./misc/Headings.js";
import sponsorTulln from "../images/trv/sponsorTulln.png";
import sponsorSport from "../images/trv/sponsorSport.gif";
import sponsorN from "../images/trv/sponsorN.jpg";
import sponsorVolksbank from "../images/trv/sponsorVolksbank.png";
import sponsorReiffeisen from "../images/trv/sponsorReiffeisen.png";
import sponsorGesund from "../images/trv/sponsorGesund.png";
import './sponsors.css';

const Container = tw.div`relative`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const HeadingInfoContainer = tw.div`flex flex-col`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-sm`;
const Title = tw.h4`text-3xl font-bold text-gray-900 text-center max-w-sm mt-20`;
const TitleSmall = tw.h6`text-xl font-bold text-gray-900 text-center max-w-sm mt-20`;

export default () => {
  return (
    <Container>
      <SingleColumn>
        <HeadingInfoContainer>
          <HeadingTitle style={{ marginBottom: "5rem" }}>
            Sponsoren und Partner
          </HeadingTitle>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="sponsorsColumn"
              
            >
              <img className="sponsorImage" src={sponsorTulln} />
              <img className="sponsorImage" src={sponsorSport} />
              <img className="sponsorImage" src={sponsorN} />
              <img className="sponsorImage" src={sponsorVolksbank} />
              <img className="sponsorImage" src={sponsorReiffeisen} />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img className="sponsorImage" src={sponsorGesund} />
            </div>
          </div>
        </HeadingInfoContainer>
      </SingleColumn>
    </Container>
  );
};
