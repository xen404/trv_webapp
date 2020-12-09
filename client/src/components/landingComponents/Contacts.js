import React from "react";
import tw from "twin.macro";
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import styled from "styled-components";

const Container = tw.div`relative`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = styled.div`
  ${tw`mt-4  text-center max-w-sm`}
  font-size: 26px;
  line-height: 1.5;
  font-weight: 300;
  color: black;
`;
const Title = tw.h4`text-3xl font-bold text-gray-900 text-center max-w-sm mt-20`;
const TitleSmall = tw.h6`text-xl font-bold text-gray-900 text-center max-w-sm mt-20`;

export default () => {
  return (
    <section id="contacts">
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
              Kontakte
            </HeadingTitle>
            <Title>Bootshaus:</Title>
            <HeadingDescription>
              Kronauer Straße 8, 3430 Tulln
            </HeadingDescription>

            <Title>Postanschrift:</Title>
            <HeadingDescription>
              Kronauer Straße 8, 3430 Tulln
              <div>
                Mobil: 0650-6642215 <br />
                Mail: office@trv.at
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div>
                  <TitleSmall>Obmann:</TitleSmall>
                  <HeadingDescription>
                    Herbert Hiesinger <br />
                    Mobil 0650-6642215
                  </HeadingDescription>
                </div>
                <div>
                  <TitleSmall>
                    Obmann Stv.,
                    <br /> Breitensportwart:
                  </TitleSmall>
                  <HeadingDescription>
                    Franz Gratsch <br />
                    Mobil: 0660-5507040
                  </HeadingDescription>
                </div>
                <div>
                  <TitleSmall>
                    Wanderfahrer <br /> melden sich bei:
                  </TitleSmall>
                  <HeadingDescription>
                    Franz Magerl <br />
                    Mobil: 0664-4347048
                  </HeadingDescription>
                </div>
              </div>
            </HeadingDescription>
          </HeadingInfoContainer>
        </SingleColumn>
      </Container>
    </section>
  );
};
