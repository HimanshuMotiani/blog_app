import React from "react";
import { ArticlesURL } from "../utils/constants";
import PostNav from "./PostNav";
import Posts from "./Posts";
import Tags from "./Tags";
import Pagination from "./Pagination";
class Home extends React.Component {
  state = {
    articles: null,
    error: "",
    articlesCount: 0,
    articlesPerPage: 10,
    activePageIndex: 1,
    activeTab:''
  };
  emptyTab=() =>{
    this.setState({
      activeTab :""
    })
  }
  addTab = (value)=>{
    this.setState({
      activeTab :value
    })
  }
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(_prevProps,prevState){
    if(prevState.activePageIndex !== this.state.activePageIndex || prevState.activeTab !== this.state.activeTab){
      this.fetchData()
    }

  }
  updateCurrentPageIndex = (index)=>{
    this.setState({
      activePageIndex : index
    },this.fetchData)
  }
  fetchData = () => {
    const limit = this.state.articlesPerPage;
    const offset = (this.state.activePageIndex-1) * limit;
    const tag = this.state.activeTab;
    fetch(ArticlesURL  +`/?offset=${offset}&limit=${limit}` + (tag && `&tag=${tag}`))
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((result) => {
        this.setState({
          articles: result.articles,
          error: "",
          articlesCount: result.articlesCount,
        });
      })
      .catch((err) => {
        this.setState({
          error: "Not able to fetch articles",
        });
      });
  };
  render() {
    const { articles, error, articlesCount, articlesPerPage, activePageIndex,activeTab } =
      this.state;
    return (
      <>
        <div className="primBack text-center py-9">
          <h1 className="text-5xl text-white font-bold">conduit</h1>
          <h4 className="text-2xl pt-4 text-white font-thin">
            A place to share knowledge
          </h4>
        </div>
        <div className="container">
          <div className="flex">
            <div className="flex-65 mt-4">
              <div>
                <PostNav activeTab={activeTab} emptyTab={this.emptyTab}/>
                <Posts articles={articles} error={error} user={this.props.user}/>
                <Pagination
                  articlesCount={articlesCount}
                  articlesPerPage={articlesPerPage}
                  activePageIndex={activePageIndex}
                  updateCurrentPageIndex={this.updateCurrentPageIndex}
                />
              </div>
            </div>
            <div className="flex-30 mt-4">
              <Tags addTab={this.addTab}/>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Home;
