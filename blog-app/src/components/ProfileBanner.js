import React from "react";
import { ProfileURL } from '../utils/constants';
import Loader from './Loader'
export default class ProfileBanner extends React.Component{
    state = {
        profile: null,
        error: null,
      };
      componentDidMount() {
        let {username} = this.props;//username from slug
        fetch(ProfileURL + '/' + username, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            if (!res.ok) {
              return Promise.reject('Unable to fetch profile!');
            }
            return res.json();
          })
          .then((profile) => this.setState({ profile: profile.profile }))
          .catch((error) => this.setState({ error }));
      }
      render() {
        if (!this.state.profile) return <Loader />;
        let { username, image} = this.state.profile;
        return (
          <div className="bg-gray-200 py-4 text-center">
            <img
              className="w-24 h-24 rounded-full inline-block mt-4 object-cover"
              src={image}
              alt=""
            />
            <h3 className="font-bold text-xl text-gray-700 mt-4">{username}</h3>
            <div className="text-right pr-60">
              {/* <ToggleFollowButton
                profile={this.state.profile}
              /> */}
            </div>
          </div>
        );
      }
}