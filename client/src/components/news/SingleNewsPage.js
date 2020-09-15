import React, { Component } from "react";
import { connect } from "react-redux";
import { getSingleNews, deleteNews } from "../../actions/newsActions";
import PropTypes from "prop-types";
import DeleteNewsModal from "./DeleteNewsModal";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import { Image } from "cloudinary-react";
import "./SingleNewsPage.css";

import "style.css";
import "tailwindcss/dist/base.css";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import BackgroundAsImageWithCenteredContent from "components/hero/BackgroundAsImageWithCenteredContent";

class SingleNewsPage extends Component {
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    console.log("component did mount");
    console.log(params.id);

    this.props.getSingleNews(params.id);
  }

  onDeleteClick = (id) => {
    this.props.deleteNews(id);
  };

  propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  renderNews() {
    console.log("render news");
    return this.props.news.news.map((news) => {
      const lol = news.body;
      const textBody = convertFromRaw(JSON.parse(news.body));
      const htmlBody = stateToHTML(textBody);
      return (
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              className="container"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Image
                className="image"
                key={news.image_url}
                cloudName="trvStorage"
                publicId={news.image_url}
                crop="scale"
                width="1000"
              />
            </div>

            <h1 style={{ display: "flex", justifyContent: "center" }}>
              {news.title}
            </h1>

            <div
              className="textBody"
              style={{
                display: "flex",
                alignSelf: "flex-start",
                paddingLeft: "10rem",
                flexDirection: "column",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: htmlBody }} />
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    console.log(this.props.news.news);
    const news = this.props.news.news;
    return (
      <div>
        <BackgroundAsImageWithCenteredContent />

        <div>{this.renderNews()}</div>
      </div>
    );
  }
}

SingleNewsPage.propTypes = {
  getSingleNews: PropTypes.func.isRequired,
  news: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  news: state.news,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getSingleNews, deleteNews })(
  SingleNewsPage
);
