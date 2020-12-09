import React, { Component } from "react";

class DownloadPdf extends Component {
  async downloadStuff() {
    window.open("/api/pdf_houserules");
  }

  render() {
    return (
      <>
        <button onClick={this.downloadStuff}>DownloadPdf</button>
      </>
    );
  }
}

export default DownloadPdf;
