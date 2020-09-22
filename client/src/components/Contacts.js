import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { SectionHeading as HeadingTitle } from "./misc/Headings.js";

const Container = tw.div`relative`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-sm`;

const Content = tw.div`mt-16`;

const Details = tw.div`mt-4 md:mt-0 md:max-w-md mx-4 sm:mx-8 md:mx-4 lg:mx-8`;
const Subtitle = tw.div`font-bold tracking-wide text-secondary-100`;
const Title = tw.h4`text-3xl font-bold text-gray-900 text-center max-w-sm mt-20`;
const TitleSmall = tw.h6`text-xl font-bold text-gray-900 text-center max-w-sm mt-20`;
const Description = tw.p`mt-2 text-sm leading-loose`;
const Link = tw.a`inline-block mt-4 text-sm text-primary-500 font-bold cursor-pointer transition duration-300 border-b-2 border-transparent hover:border-primary-500`;

export default () => {
  return (
    <Container>
      <SingleColumn>
        <HeadingInfoContainer>
          <HeadingTitle>Kontakte</HeadingTitle>
          <Title>Bootshaus:</Title>
          <HeadingDescription>Kronauer Straße 8, 3430 Tulln</HeadingDescription>

          <Title>Postanschrift:</Title>
          <HeadingDescription>
            Kronauer Straße 8, 3430 Tulln
            <div>
              Mobil: 0650-6642215 <br />
              Mail: office@trv.at
            </div>
          </HeadingDescription>
        </HeadingInfoContainer>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <div>
              <TitleSmall>Obmann: 
                 <br/> <br/></TitleSmall>
              <HeadingDescription>
                Herbert Hiesinger <br />
                Mobil 0650-6642215
              </HeadingDescription>
            </div>
            <div>
              <TitleSmall>Obmann Stv.,<br/> Breitensportwart:</TitleSmall>
              <HeadingDescription>
                Franz Gratsch <br />
                Mobil: 0660-5507040
              </HeadingDescription>
            </div>
            <div>
              <TitleSmall>Wanderfahrer <br/> melden sich bei:</TitleSmall>
              <HeadingDescription>
                Franz Magerl <br />
                Mobil: 0664-4347048
              </HeadingDescription>
            </div>
          </div>
      </SingleColumn>
    </Container>
  );
};
