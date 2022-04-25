import React from "react";
import { Link } from "react-router-dom";
import { ArticlesURL } from "../utils/constants";
import UserContext from "./UserContext";
export default class Post extends React.Component {
  state = {
    favorited: null,
    favoritesCount: 0,
  };
  static contextType = UserContext;
  componentDidMount() {
    let { favorited, favoritesCount } = this.props;
    this.setState({ favorited, favoritesCount });
  }
  handleFavorite = (slug) => {
    let method = this.state.favorited ? "DELETE" : "POST";
    let token = this.context.user ? "Token " + this.context.user.token : "";
    fetch(ArticlesURL + `/${slug}/favorite`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((article) => {
        let { favorited, favoritesCount } = article.article;
        console.log(favorited, favoritesCount);
        this.setState({ favorited, favoritesCount });
      });
  };
  render() {
    const { author, createdAt, title, description, slug, tagList } = this.props;
    let { favoritesCount, favorited } = this.state;
    return (
      <>
        <article className="mb-10 mt-10 shadow p-4 rounded">
          <div className="flex my-4 justify-between items-center">
            <div className="flex">
              <div className="mr-2">
                <img className="img-post" src={author.image} alt={author.username}/>
              </div>
              <div>
                <h5 className="primColor text-sm">{author.username}</h5>
                <h6 className="light-gray text-sm">{createdAt}</h6>
              </div>
            </div>
            <div className="like-btn text-lg">
              {this.context.user && (
                <button
                  className={`border rounded py-1 px-2 text-sm shadow ${
                    favorited ? "primColor text-white" : "bg-white text-green"
                  }`}
                  onClick={() => {
                    this.handleFavorite(slug);
                  }}
                >
                  <i className="fas fa-heart"></i> <span>{favoritesCount}</span>
                </button>
              )}
            </div>
          </div>
          <Link to={`/article/${slug}`}>
            <div>
              <h3 className="font-bold text-2xl my-2"> {title}</h3>

              <p>{description}</p>
            </div>
          </Link>
          <div className="flex justify-between mt-4">
            <Link to={`/article/${slug}`}>
              <div>
                <button className="text-sm primColor">Read more</button>
              </div>
            </Link>
            <ul>
              {tagList.map((tag) => (
                <li
                  key={tag}
                  className="text-gray-400 font-light border rounded-lg inline-block px-2 text-xs ml-1"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </>
    );
  }
}
