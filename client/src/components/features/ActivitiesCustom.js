import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import rudertage from "../../images/trv/rudertage.jpeg";
import sternfahrt from "../../images/trv/sternfahrt.jpeg";
import wanderfahrt from "../../images/trv/wanderfahrt.jpeg";
import jugendsport from "../../images/trv/jugendsport.jpeg";
import wettkampfsport from "../../images/trv/wettkampfsport.jpeg";
import "./ActivitiesCustom.css";

const Container = tw.div`relative`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-sm`;

const Content = tw.div`mt-16`;

const Card = styled.div((props) => [
  tw`mt-24 md:flex justify-center items-center`,
  props.reversed ? tw`flex-row-reverse` : "flex-row",
]);
const Image = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  `border: 20px solid palevioletred;
  width: 400px;
  height: 144px`,
  //tw`rounded md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 h-80 md:h-144 bg-cover bg-center mx-4 sm:mx-8 md:mx-4 lg:mx-8`,
]);
const Details = tw.div`mt-4 md:mt-0 md:max-w-md mx-4 sm:mx-8 md:mx-4 lg:mx-8`;
const Subtitle = tw.div`font-bold tracking-wide text-secondary-100`;
const Title = tw.h4`text-3xl font-bold text-gray-900`;
const Description = tw.p`mt-2 text-sm leading-loose`;
const Link = tw.a`inline-block mt-4 text-sm text-primary-500 font-bold cursor-pointer transition duration-300 border-b-2 border-transparent hover:border-primary-500`;

export default () => {
  return (
    <Container style={{ paddingTop: "150px", marginBottom: "150px" }}>
      <HeadingInfoContainer>
        <HeadingTitle style={{marginBottom: "90px", fontSize: "42px", lineHeight: "1.23", fontWeight: "700", color: "black"}}>Weitere Aktivitäten</HeadingTitle>
        <HeadingDescription></HeadingDescription>
      </HeadingInfoContainer>

      <div className="column">
        <div className="row">
          <div className="rightSection">
            <div className="imageWrapper">
              <div className="image">
                <img style={{ height: "100%" }} src={rudertage} />
              </div>
            </div>
          </div>

          <div className="leftSection">
            <div className="textWrapper">
              <div>
                <Title>Rudertage</Title>
                <br />
                <p>
                  Mehrmals wöchentlich treffen wir uns, um auf der Donau und der
                  Großen Tulln Rudern als Freizeit- und Familiensport zu
                  betreiben. Unsere Rudertage sind von April bis September:
                  Montag, Mittwoch und Samstag – aktuelle Zeiten siehe linke
                  Spalte.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="leftSection">
            <div className="imageWrapper">
              <div className="image">
                <img style={{ height: "100%" }} src={sternfahrt} />
              </div>
            </div>
          </div>
          <div className="rightSection">
            <div className="textWrapper">
              <div>
                <Title>Sternfahrten</Title>
                <br />
                <p>
                  Wir rudern gemeinsam zu dem Klub, der die sog. Sternfahrt
                  veranstaltet. Nach der gemeinsamen Fahrt steht dort das
                  gesellige Zusammensein mit Ruderern aus verschiedenen Vereinen
                  im Mittelpunkt. Sternfahrten finden zu den Klubs an der Donau
                  in Niederösterreich und Wien statt.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="rightSection">
            <div className="imageWrapper">
              <div className="image">
                <img style={{ height: "100%" }} src={wanderfahrt} />
              </div>
            </div>
          </div>
          <div className="leftSection">
          <div className="textWrapper">
            <div>
              <Title>Wanderfahrten</Title>
              <br />
              <p>
                Rudern ist Natur- und Erlebnissport. Das Befahren fremder Flüsse
                und Gewässer und das Beobachten von Natur und Tierwelt aus einer
                ungewohnten Perspektive bieten für Jung und Alt besondere
                Erfahrungen und Abenteuer.
              </p>
            </div>
          </div>
        </div>
        </div>
       

        <div className="row">
          <div className="leftSection">
            <div className="imageWrapper">
              <div className="image">
                <img style={{ height: "100%" }} src={jugendsport} />
              </div>
            </div>
          </div>
          <div className="rightSection">
            <div className="textWrapper">
              <div>
                <Title>Jugendsport</Title>
                <br />
                <p>
                  Spielerisch erlernen unsere Kids den Umgang mit dem Boot.
                  Bootsmanöver, Rudertechnik, Rudern in verschiedenen
                  Bootsklassen vom Einer bis zum Vierer stehen auf dem Programm.
                  Koordinative Fähigkeiten, Teamgeist und Verantwortung werden
                  so geschult. Rudern ist ein Sport, der keine besonderen
                  Vorkenntnisse erfordert und daher für Jugendliche leicht
                  erlernbar. Mindestkörpergröße ca. 150 cm
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="rightSection">
            <div className="imageWrapper">
              <div className="image">
                <img style={{ height: "100%" }} src={wettkampfsport} />
              </div>
            </div>
          </div>
          <div className="leftSection">
            <div className="textWrapper">
              <div>
                <Title>Rudern als Wettkampfsport </Title>
                <br />
                <p>
                  Rudern ist ein Sport, bei dem Kraft, Ausdauer, Schnelligkeit
                  und Beweglichkeit gesteigert werden. Wie kaum eine andere
                  Sportart spricht Rudern eine breite Palette von Muskelgruppen
                  an.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
