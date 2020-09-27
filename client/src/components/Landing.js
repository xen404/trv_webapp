import React, { Component } from "react";
import BackgroundImageCustom from "./hero/BackgroundImageCustom";
import BackgroundImageText from './hero/BackgroundImageText';
import Prices from "./features/Prices";
import NewsBoardCustom from "./news/NewsBoardCustom";
import Activities from "./features/Activities";
import ActivitiesCustom from './features/ActivitiesCustom';
import Contacts from "./Contacts";
import Sponsors from "./Sponsors";
import DownloadButtons from "./DownloadButtons";


class Landing extends Component {
  render() {
    return (
      <>
        <BackgroundImageText />
        <Prices />
        <NewsBoardCustom /> 
        <ActivitiesCustom />
        <DownloadButtons />
        <Contacts />
        <Sponsors />
      </>
    );
  }
}

export default Landing;
