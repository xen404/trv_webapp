import React, { Component } from "react";
import { connect } from "react-redux";
import { getNews, deleteNews } from "../../actions/newsActions";
import { Image } from "cloudinary-react";
import PropTypes from "prop-types";
import DeleteNewsModal from './DeleteNewsModal';

class NewsList extends Component {
  componentDidMount() {
    this.props.getNews();
  }

  onDeleteClick = (id) => {
    this.props.deleteNews(id);
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  renderNews() {
    //const {news} = this.props.news;
    return this.props.news.news.map((news) => {
      return (
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
              <span className="card-title">{news.title}</span>
            </div>
            <div className="card-content">
              <p>{news.preview_text}</p>
            </div>

            {this.props.isAuthenticated ? (
              <div className="card-action">
                <DeleteNewsModal newsId={news.id} newsTitle={news.title} />
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="row">
        <div>{this.renderNews()}</div>
      </div>
    );
  }
}

NewsList.propTypes = {
  getNews: PropTypes.func.isRequired,
  news: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  news: state.news,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getNews, deleteNews })(NewsList);
