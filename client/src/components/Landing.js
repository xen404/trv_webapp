import React, { Component } from "react";
import BackgroundImageCustom from "./hero/BackgroundImageCustom";
import BackgroundImageText from './hero/BackgroundImageText';
import Prices from "./features/Prices";
import NewsBoardCustom from "./news/NewsBoardCustom";
import Activities from "./features/Activities";
import Contacts from "./Contacts";
import Sponsors from "./Sponsors";


class Landing extends Component {
  render() {
    return (
      <>
        <BackgroundImageText />
        <Prices />
        <NewsBoardCustom /> 
        <Activities />
        <Contacts />
        <Sponsors />
      </>
    );
  }
}

export default Landing;
