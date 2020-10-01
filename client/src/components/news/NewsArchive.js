import React, { Component } from "react";
import { connect } from "react-redux";
import { getNews, deleteNews } from "../../actions/newsActions";
import { Image } from "cloudinary-react";
import PropTypes from "prop-types";
import styled from "styled-components";
import tw from "twin.macro";
import DeleteNewsModal from "./DeleteNewsModal";
import NewsFormModal from "./NewsFormModal";
import { css } from "styled-components/macro"; //eslint-disable-line
import "slick-carousel/slick/slick.css";
import "./newsBoardCustom.css";
import NewsDetailsModal from "./NewsDetailsModal";
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";



/*
    SLIDER CONSTS
*/

const Container = styled.div`
  ${tw`relative`}
  padding-top: 135px;
  padding-bottom: 135px;
  z-index: 1;
`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;

/*
    CARDS CONSTS
*/

const Content = tw.div``;
const ThreeColumn = tw.div`flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap`;
const Column = tw.div``;

//const HeadingInfoContainer = tw.div`flex flex-col items-center`;
//const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-sm`;

const Card = tw.div`mx-4 xl:mx-8 max-w-sm flex flex-col h-full`;

const ImageWrapper = styled.div((props) => [
  //`background-image: url("${props.imageSrc}");`,
  //tw`bg-cover bg-center h-80 lg:h-64 rounded rounded-b-none`,
]);

const Details = tw.div`p-6 pb-0 rounded border-2 border-t-0 rounded-t-none flex-1 flex flex-col items-center text-center lg:block lg:text-left`;

const Title = tw.h5`mt-4 leading-snug font-bold text-lg`;
const Description = tw.p`mt-2 text-sm text-secondary-100`;
/*const Link = styled(PrimaryButtonBase).attrs({ as: "a" })`
  ${tw`inline-block mt-4 text-sm font-semibold`}
`;
*/

class NewsArchive extends Component {
  componentDidMount() {
    console.log("News Archive did mount");
    this.props.getNews();
  }

  onDeleteClick = (id) => {
    this.props.deleteNews(id);
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    getNews: PropTypes.func.isRequired,
    news: PropTypes.object.isRequired,
  };

  renderNews() {
    if (this.props.news) {
      const newsInput = this.props.news.news;

      return (
        <div>
          <HeadingInfoContainer>
            <HeadingTitle
              style={{
                  marginTop: "60px",
                marginBottom: "0px",
                fontSize: "42px",
                lineHeight: "1.23",
                fontWeight: "700",
                color: "black",
              }}
            >
              Archive
            </HeadingTitle>
          </HeadingInfoContainer>
          <Content
            style={{
              marginBottom: "135px",
              marginTop: "135px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "stretch",

            }}
          >
            {newsInput.map((news, index) => {
              return (
                <Card style={{alignSelf: "stretch"}}>
                  <ImageWrapper>
                    <Image
                      key={news.image_url}
                      cloudName="trvStorage"
                      publicId={news.image_url}
                      crop="scale"
                      width="600"
                      className="imageWrapper"
                    />
                  </ImageWrapper>
                  <Details
                    className="newsCardDetails"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <Title>{news.title}</Title>
                      <Description>{news.preview_text}</Description>
                    </div>
                    <div
                      className="newsCardButtons"
                      style={{
                        marginBottom: "8px",
                        marginTop: "16px",
                        display: "flex",
                        flexDirection: "row",
                        alignContent: "space-between",
                      }}
                    >
                      <NewsDetailsModal news={news} />
                      {this.props.isAuthenticated ? (
                        <DeleteNewsModal newsId={news.id} />
                      ) : (
                        ""
                      )}
                    </div>
                  </Details>
                </Card>
              );
            })}
          </Content>
          {this.props.isAuthenticated ? <NewsFormModal /> : <p></p>}
        </div>
      );
    } else {
      return <div>FUUUUUUUUCK!</div>;
    }
  }

  render() {
    return <div>{this.renderNews()}</div>;
  }
}

const mapStateToProps = (state) => ({
  news: state.news,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getNews })(NewsArchive);
