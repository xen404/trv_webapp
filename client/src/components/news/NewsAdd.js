import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNews } from "../../actions";
import NewsFormModal from "./NewsFormModal";

class InputNews extends Component {
  render() {
    return (
      <div>
        <NewsFormModal />
      </div>
    );
  }
}

export default InputNews;
 