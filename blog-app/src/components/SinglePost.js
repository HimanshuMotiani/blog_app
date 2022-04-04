import React from "react";
import { ArticlesURL } from "../utils/constants";
import Loader from './Loader';
export default class SinglePost extends React.Component {
  state = {
      article:null,
      error:''
  }
  componentDidMount(){
      let slug = this.props.match.params.slug
    fetch(ArticlesURL+"/"+slug)
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
  render() {
    const {article ,error} = this.state;
    if(error){
      return <p>{error}</p>
    }
    if(!article){
      return <Loader/>
    }
    return (
      <>
        <article className="container mb-10">
          <div className="single-article">
          <h3 className="ml-28 text-white text-5xl font-bold"> {article.title}</h3>
            <div className="flex my-10">
              <div className="ml-28 mr-2">
                <img className="img-post" src="" />
              </div>
              <div className="">
                <h5 className="primColor text-sm">{article.author.username}</h5>
                <h6 className="light-gray text-sm">{article.createdAt}</h6>
              </div>
            </div>
          </div>
          <div className="mx-28 my-10">
            <p className="text-gray-600">{article.description}</p>
            <h6 className="inline-block mt-5 light-gray border border-gray-300 text-xs rounded-lg px-2 py-1 ">
              database
            </h6>
            </div>
          <hr className="my-5"></hr>
        </article>
      </>
    );
  }
}
