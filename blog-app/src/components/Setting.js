import React from "react";
import validateErrors from '../utils/validateErrors'
export default class Setting extends React.Component {
  state = {
    image: "",
    username: "",
    bio: "",
    email: "",
    password: "",
    errors: {
      image: "",
      username: "",
      bio: "",
      email: "",
      password: "",
    },
  };
  handleChange = (event) => {
    let { name, value } = event.target;
    let { errors } = this.state;
    validateErrors(errors, name, value);
    this.setState({ [name]: value });
  };
  render() {
    let { image, username, bio, email, password, errors } = this.state;
    return (
      <section className="pt-8 px-64">
        <form
          onSubmit={this.handleSubmit}
          className="border p-4 px-8 rounded shadow"
        >
          <h2 className="text-center text-2xl mt-4">Your Setting</h2>
          <input
            onChange={this.handleChange}
            type="text"
            name="image"
            className="block w-full border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4 h-10"
            placeholder="URL of profile picture"
            value={image}
          />
          <input
            onChange={this.handleChange}
            name="username"
            type="text"
            className="block w-full border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4"
            value={username}
          />
          <span className="text-red-500 block text-center">
            {errors.username}
          </span>
          <textarea
            onChange={this.handleChange}
            name="bio"
            className="block w-full border rounded-lg border-gray-300 px-2 py-3 mx-auto mt-4  text-gray-400"
            rows="6"
            placeholder={bio}
            value={bio}
          ></textarea>
          <input
            onChange={this.handleChange}
            type="email"
            name="email"
            className="block w-full border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4"
            placeholder="Email"
            value={email}
          />
          <span className="text-red-500 block text-center">{errors.email}</span>
          <input
            onChange={this.handleChange}
            name="password"
            type="password"
            className="block w-full border rounded-lg border-gray-300 px-2  py-3 mx-auto mt-4"
            placeholder="New Password"
            value={password}
          />
          <span className="text-red-500 block text-center">
            {errors.password}
          </span>
          <div className="w-full mx-auto text-right pt-8">
            <button
              className="primBack px-6 py-3 rounded text-white inline-block"
              type="submit"
              disabled={errors.email || errors.password}
            >
              Update Setting
            </button>
          </div>
        </form>
        <div className="w-full mx-auto text-left pt-8">
          <button
            className="border border-red-500 px-6 rounded text-red-500 inline-block h-10 hover:bg-red-500 hover:text-white"
            onClick={this.handleLogout}
          >
            Or click here to logout.
          </button>
        </div>
      </section>
    );
  }
}
