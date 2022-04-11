import React from "react";
import validateErrors from "../utils/validateErrors";
import { NavLink } from "react-router-dom";
import {RegistrationURL} from "../utils/constants";
import { withRouter } from 'react-router-dom';
class Signup extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: {
        username:"",
        email: "",
        password: "",
      },
    };
  }
  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = this.state.errors;
    validateErrors(errors, name, value);
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      user: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      },
    };
    fetch(RegistrationURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          })
        } 
        return res.json();
      })
      .then(({user}) => {
        this.props.updateUser(user)
        this.setState({ username: '', email: '', password: '' }); 
        this.props.history.push("/")
      })
      .catch((errors) => this.setState({ errors }));
      
  };

  render() {
    let { email, password, username, errors } = this.state;

    return (
      <>
        <div className="container">
          <div className="text-center mt-10">
            <h2 className="text-4xl">Sign up</h2>
            <div className="my-3">
              <NavLink to="/login" className="primColor cursor-pointer my-5">
                Have an account?
              </NavLink>
            </div>
          </div>
          <form onSubmit={this.handleSubmit} className="text-center">
            <input
              type="text"
              className="input-field"
              name="username"
              value={username}
              onChange={this.handleChange}
              placeholder="Username"
            />
            <input
              type="text"
              className="input-field"
              name="email"
              value={email}
              onChange={this.handleChange}
              placeholder="Email"
            />
            <span className="text-red">{errors.email}</span>
            <input
              type="text"
              className="input-field"
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="Password"
            />
            <span className="text-red">{errors.password}</span>
            <div>
              <button
                type="submit"
                className="primBack text-white py-2 px-4 rounded-lg text-xl inline-block mt-5"
                disabled={errors.email || errors.password || errors.username}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}
export default withRouter(Signup);
