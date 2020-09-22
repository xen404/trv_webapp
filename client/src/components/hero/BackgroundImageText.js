import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Parallax, Background } from "react-parallax";
import "./style.css";

const BackgroundImageText = () => {
  const mainPic = require("../../images/MainPicture.jpg");
  const Container = styled.div`
    ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144`}
    z-index: -1;
  `;

  const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black opacity-25`;

  const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144`;
  const Content = tw.div`px-4 flex flex-1 flex-col justify-center items-center`;

  const Heading = styled.h1`
    ${tw`text-3xl text-center sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-snug -mt-24 sm:mt-0`}
    span {
      ${tw`inline-block mt-2`}
    }
  `;

  return (
    <Container>
      <OpacityOverlay />
      <Parallax
        bgClassName="fill"
        style={{ height: "100%" }}
        bgImage={mainPic}
        strength={700}
      >
        <HeroContainer>
          <Content>
            <Heading>Tullner Ruderverein</Heading>
          </Content>
        </HeroContainer>
      </Parallax>
    </Container>
  );
};
export default BackgroundImageText;
