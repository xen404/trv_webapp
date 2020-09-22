import React, { Component } from "react";
import BackgroundImageCustom from "./hero/BackgroundImageCustom";
import BackgroundImageText from './hero/BackgroundImageText';
import Prices from "./features/Prices";
import NewsBoardCustom from "./news/NewsBoardCustom";
import Activities from "./features/Activities";


class Landing extends Component {
  render() {
    return (
      <>
        <BackgroundImageText />
        <Prices />
        <NewsBoardCustom /> 
        <Activities />
      </>
    );
  }
}

export default Landing;
