import React, { Component } from "react";
import tw from "twin.macro";
import {Button } from 'reactstrap';
import { SectionHeading as HeadingTitle } from "./misc/Headings.js";
import "./DownloadButtons.css";

const Container = tw.div`relative`;

class DownloadPdf extends Component {

async downloadHouseRules() {
    window.open('/api/pdf_houserules')
    //console.log(res)
}

async downloadFormular() {
    window.open('/api/pdf_houserules')
    //console.log(res)
}

  render() {
    return (
        <Container>
        <HeadingTitle>Dokumente</HeadingTitle>
      <div className="downloadButtonsContainer" style={{display: "flex", flexDirection: "row", justifyContent: "center", height: "60px" }}>
        <button className="downloadButton" style={{marginRight: "20px", paddingLeft: "45px", paddingRight: "45px", backgroundColor: "black", color: "white"}} onClick={this.downloadFormular}>
       <div className="downloadButtonContent" style={{display: "flex", flexDirection: "row", alignItems: "center" }}>
        <i style={{paddingRight: "15px"}} className="material-icons">file_download</i>
            <b>Mitgliedsformular</b>
            </div>
        </button>
        <button className="downloadButton" style={{marginRight: "20px", paddingLeft: "45px", paddingRight: "45px", backgroundColor: "black", color: "white"}} onClick={this.downloadHouseRules}>
       <div className="downloadButtonContent" style={{display: "flex", flexDirection: "row", alignItems: "center" }}>
        <i style={{paddingRight: "15px"}} className="material-icons">file_download</i>
            <b>House Rules</b>
            </div>
        </button>
      </div>
      </Container>
    );
  }
}

export default DownloadPdf;
