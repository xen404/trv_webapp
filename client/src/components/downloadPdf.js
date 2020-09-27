import React, { Component } from "react";
import axios from "axios";




class DownloadPdf extends Component {

async downloadStuff() {
    window.open('/api/pdf_houserules')
    //console.log(res)
}

  render() {
    return (
      <>
        <button onClick={this.downloadStuff}>
            DownloadPdf
        </button>
      </>
    );
  }
}

export default DownloadPdf;
