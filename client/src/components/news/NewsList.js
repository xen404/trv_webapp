import React, { Component } from "react";
import { connect } from "react-redux";
import { getNews, deleteNews } from "../../actions/newsActions";
import { Image } from "cloudinary-react";
import PropTypes from "prop-types";
import DeleteNewsModal from "./DeleteNewsModal";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

class NewsList extends Component {
  componentDidMount() {
    console.log("component did mount");
    this.props.getNews();
  }

  onDeleteClick = (id) => {
    this.props.deleteNews(id);
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    getNews: PropTypes.func.isRequired,
    news: PropTypes.object.isRequired,
  };

  renderNews() {
    return this.props.news.news.map((news) => {
      const textBody = convertFromRaw(JSON.parse(news.body));
      const htmlBody = stateToHTML(textBody);
      return (
        <div>
          <div key={news.id} className="col s12 m4">
            <div className="card medium">
              <div className="card-image">
                <Image
                  key={news.image_url}
                  cloudName="trvStorage"
                  publicId={news.image_url}
                  crop="scale"
                  width="600"
                />
                <span className="card-title">{news.id}</span>
              </div>
              <div className="card-content">
                <div dangerouslySetInnerHTML={{ __html: htmlBody }} />
              </div>

              <div
                style={{ display: "flex", flexDirection: "row" }}
                className="card-action"
              >
                <div>
                  <Link to={`/news/${news.id}`}>
                    <Button to={`/news/${news.id}`} color="info" size="sm">
                      More
                    </Button>
                  </Link>
                </div>

                {this.props.isAuthenticated ? (
                  <DeleteNewsModal newsId={news.id} newsTitle={news.title} />
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>
          <div></div>
        </div>
      );
    });
  }

  render() {
    console.log("NEWSLIST");
    console.log(this.props.news);

    return <div>{this.renderNews()}</div>;
  }
}

const mapStateToProps = (state) => ({
  news: state.news,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getNews, deleteNews })(NewsList);
