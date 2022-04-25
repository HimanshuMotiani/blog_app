import React from "react";
import validateErrors from "../utils/validateErrors";
import { ArticlesURL } from "../utils/constants";
import {withRouter} from 'react-router-dom'
import UserContext from "./UserContext";
class NewPost extends React.Component {
  state = {
    title: "",
    description: "",
    body: "",
    tagList: "",
    errors: {
      title: "",
      description: "",
      body: "",
      tagList: "",
    },
  };
  static contextType = UserContext
  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = this.state.errors;
    validateErrors(errors, name, value);
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchData();
  };
  fetchData() {
    let { title, description, body, tagList } = this.state;
    tagList = tagList.split(',').map((ele) => ele.trim());
    let data = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };
    fetch(ArticlesURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.context.user.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => Promise.reject(error));
        }
        return res.json();
      })
      .then((body) => {
        this.setState({ title: '', description: '', body: '', tagList: '' });
        this.props.history.push('/');
      })
      .catch((errors) => {
        console.log(errors);
      });
  }
  render() {
    let { errors, title, description, body, tagList } = this.state;
    return (
      <>
        <section className="text-center pt-14 px-64">
          <form
            onSubmit={this.handleSubmit}
            className="border p-8 rounded shadow"
          >
            <h2 className="text-left text-xl">Write your Article...</h2>
            <input
              onChange={this.handleChange}
              type="text"
              name="title"
              className="block w-full border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4 text-lg"
              placeholder="Article Title"
              value={title}
            />
            <span className="text-red-500 block">{errors.title}</span>
            <input
              onChange={this.handleChange}
              type="text"
              name="description"
              className="block w-full border rounded-lg border-gray-300 px-2 py-3 mx-auto mt-4 h-10 h-10"
              placeholder="description"
              value={description}
            />
            <span className="text-red-500 block">{errors.description}</span>
            <textarea
              onChange={this.handleChange}
              name="body"
              className="block w-full border rounded-lg border-gray-300 px-2 py-3 mx-auto mt-4  text-gray-400"
              rows="6"
              placeholder="Write your article (in markdown)"
              value={body}
            ></textarea>
            <span className="text-red-500 block">{errors.article}</span>
            <input
              onChange={this.handleChange}
              name="tagList"
              type="text"
              className="block w-full border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4 h-10"
              placeholder="Enter tags sperated by a comma"
              value={tagList}
            />
            <span className="text-red-500 block">{errors.tagList}</span>
            <div className="text-right pt-8">
              <button
                className="bg-gray-500 px-6 rounded text-white h-10 inline-block"
                type="submit"
                disabled={
                  errors.title ||
                  errors.description ||
                  errors.body ||
                  errors.tagList ||
                  !title ||
                  !description ||
                  !body ||
                  !tagList
                }
              >
                Publish Article
              </button>
            </div>
          </form>
        </section>
      </>
    );
  }
}
export default withRouter(NewPost)
