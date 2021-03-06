import React from "react";
import { ArticlesURL } from "../utils/constants";
import ProfileBanner from './ProfileBanner';
import ProfileFeedNav from './ProfileFeedNav'
import Posts from './Posts';
import UserContext from "./UserContext";
export default class Profile extends React.Component {
  state = {
    activeTab: "author",
    articles: [],
    error:null
  };
  static contextType = UserContext;
  componentDidMount() {
    this.fetchData();
  }
  handleActiveTab = (label) => {
    this.setState({ activeTab: label }, () => {
      this.fetchData({});
    });
  };
  fetchData = () => {
    fetch(ArticlesURL + `/?${this.state.activeTab}=${this.context.user.username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((result) => {
        this.setState({
          articles: result.articles,
        });
      })
      .catch((err) => {
        this.setState({
          error: "Not able to fetch articles",
        });
      });
  };

  render() {
    let { articles, error, activeTab } = this.state;
    let username  = this.context.user.username;
    return (
      <section>
        <ProfileBanner username={username} />
        <ProfileFeedNav
          activeTab={activeTab}
          handleActiveTab={this.handleActiveTab}
        />
        <div className="px-60">
          <Posts articles={articles} error={error} />
        </div>
      </section>
    );
  }

}
