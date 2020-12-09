import React from "react";
import tw from "twin.macro";
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import sponsorTulln from "../../images/trv/sponsorTulln.png";
import sponsorSport from "../../images/trv/sponsorSport.gif";
import sponsorN from "../../images/trv/sponsorN.jpg";
import sponsorVolksbank from "../../images/trv/sponsorVolksbank.png";
import sponsorReiffeisen from "../../images/trv/sponsorReiffeisen.png";
import sponsorGesund from "../../images/trv/sponsorGesund.png";
import "./sponsors.css";

const Container = tw.div`relative`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const HeadingInfoContainer = tw.div`flex flex-col`;

export default () => {
  return (
    <Container>
      <SingleColumn>
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
            Sponsoren und Partner
          </HeadingTitle>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="sponsorsColumn">
              <img className="sponsorImage" src={sponsorTulln} alt=""/>
              <img className="sponsorImage" src={sponsorSport} alt=""/>
              <img className="sponsorImage" src={sponsorN} alt=""/>
              <img className="sponsorImage" src={sponsorVolksbank} alt=""/>
              <img className="sponsorImage" src={sponsorReiffeisen} alt=""/>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img className="sponsorImage" src={sponsorGesund} alt=""/>
            </div>
          </div>
        </HeadingInfoContainer>
      </SingleColumn>
    </Container>
  );
};
