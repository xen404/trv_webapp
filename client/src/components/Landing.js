import React, { Component } from "react";
import BackgroundImageText from './parallaxBgImage/BackgroundImageText';
import Prices from "./landingComponents/Prices";
import NewsBoardCustom from "./news/NewsBoardCustom";
import ActivitiesCustom from './landingComponents/ActivitiesCustom';
import Contacts from "./landingComponents/Contacts";
import Sponsors from "./landingComponents/Sponsors";
import DownloadButtons from "./DownloadPdf/DownloadButtons";
import CardSlider from './timeTable/CardSlider';
import GallerySlider from "../components/gallery/GallerySlider";


class Landing extends Component {
  render() {
    return (
      <>
        <BackgroundImageText />
        <Prices />
        <NewsBoardCustom /> 
        <ActivitiesCustom />
        <CardSlider />
        <GallerySlider/>
        <DownloadButtons />
        <Contacts />
        <Sponsors />
      </>
    );
  }
}

export default Landing;
