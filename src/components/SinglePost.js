import React from "react";
import { Link, withRouter} from "react-router-dom";
import { ArticlesURL } from "../utils/constants";
import Loader from "./Loader";
import CommentBox from './CommentBox'
import UserContext from "./UserContext";

class SinglePost extends React.Component {
  state = {
    article: null,
    error: "",
  };
  static contextType = UserContext;
  componentDidMount() {
    let slug = this.props.match.params.slug;
    fetch(ArticlesURL + "/" + slug)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((result) => {
        this.setState({
          article: result.article,
          error: "",
        });
      })
      .catch((err) => {
        this.setState({
          error: "Not able to fetch article",
        });
      });
  }
  handleDelete = (slug) => {
    fetch(ArticlesURL + '/' + slug, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + this.context.user.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject('Unable to delete!');
        }
      })
      .then(() => {
        this.props.history.push('/');
      })
      .catch((error) => this.setState({ error }));
  };
  render() {
    const { article, error } = this.state;
    if (error) {
      return <p>{error}</p>;
    }
    if (!article) {
      return <Loader />;
    }
    return (
      <>
        <article className="container mb-10">
          <div className="single-article">
            <h3 className="ml-28 text-white text-5xl font-bold">
              {" "}
              {article.title}
            </h3>
            <div className="flex my-10">
              <div className="ml-28 mr-2">
                <img className="img-post" src="" alt=""/>
              </div>
              <div className="">
                <h5 className="primColor text-sm">{article.author.username}</h5>
                <h6 className="light-gray text-sm">{article.createdAt}</h6>
              </div>
              {this.context.user &&
            this.context.user.username === article.author.username ? (
              <div>
                <button className="border border-gray-400 rounded ml-6 px-3 text-sm py-1 text-gray-400 hover:bg-gray-400 hover:text-white">
                  <Link to={`/edit-article/${article.slug}`}>
                    <i className="fas fa-edit"></i> Edit Article
                  </Link>
                </button>
                <button
                  className="border border-red-400 rounded ml-2 px-3 text-sm py-1 text-red-400 hover:bg-red-400 hover:text-white"
                  onClick={() => {
                    this.handleDelete(article.slug);
                  }}
                >
                  <i className="fas fa-trash-alt"></i> Delete Article
                </button>
              </div>
            ) : (
              ''
            )}
            </div>
          </div>
          <div className="mx-28 my-10">
            <p className="text-gray-600">{article.description}</p>
            <ul className="mt-10">
            {article.tagList.map((tag) => (
              <li
                key={tag}
                className="text-gray-400 font-light border rounded-lg inline-block px-2 text-xm ml-1"
              >
                {tag}
              </li>
            ))}
          </ul>
          </div>
          <hr className="my-5"></hr>
        </article>
        {!this.context.user?(<footer className="text-center mt-16">
          <div>
            <p>
              <Link className="primColor" to="/login">Sign in</Link> or 
              <Link className="primColor" to="/signup"> Sign up</Link>  to add comments on article
            </p>
          </div>
        </footer>
        )
        :<CommentBox slug={this.props.match.params.slug}/>
        }

      </>
    );
  }
}

export default withRouter(SinglePost)
