import { Route, Switch } from "react-router-dom";
import NoMatch from "./NoMatch";
import Header from "./Header";
import Login from "./Login";
import Home from "./Home";
import Signup from "./Signup";
import SinglePost from "./SinglePost";
import React from "react";
import { localStorageKey, userVerifyURL } from "../utils/constants";
import NewPost from "./NewPost";
import Profile from "./Profile";
import Setting from "./Setting";
import Loader from "./Loader";
import EditArticle from "./EditArticle";
import ErrorBoundary from "./ErrorBoundary";
import UserContext from "./UserContext";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
    userVerifying: true,
  };

  updateUser = (user) => {
    this.setState({
      isLoggedIn: true,
      user,
      userVerifying: false,
    });
    localStorage.setItem(localStorageKey, user.token);
  };

  componentDidMount() {
    let token = localStorage[localStorageKey];
    if (token) {
      fetch(userVerifyURL, {
        method: "GET",
        headers: {
          authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then(({ errors }) => {
              return Promise.reject(errors);
            });
          }
          return res.json();
        })
        .then((user) => this.updateUser(user.user))
        .catch((error) => console.log(error));
    } else {
      this.setState({ userVerifying: false });
    }
  }
  render() {
    let { isLoggedIn, user } = this.state;
    if (this.state.userVerifying) {
      return <Loader />;
    }
    return (
      <>
      <UserContext.Provider value={{isLoggedIn,user,updateUser:this.updateUser}}>
      <ErrorBoundary>
        <Header/>
        </ErrorBoundary>
        <ErrorBoundary>
        {this.state.isLoggedIn ? (
          <AuthenticatedApp
            user={this.state.user}
            updateUser={this.updateUser}
          />
        ) : (
          <UnauthenticatedApp
            user={this.state.user}
            updateUser={this.updateUser}
          />
        )}
        </ErrorBoundary>
        </UserContext.Provider>
      </>
    );
  }
}

function AuthenticatedApp(props) {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/new_post">
          <NewPost/>
        </Route>
        <Route path="/settings">
          <Setting/>
        </Route>
        <Route path="/edit-article/:slug">
          <EditArticle/>
        </Route>
        <Route path="/profile">
          <Profile/>
        </Route>
        <Route path="/article/:slug">
          <SinglePost/>
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </>
  );
}

function UnauthenticatedApp(props) {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/article/:slug">
          <SinglePost/>
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </>
  );
}

export default App;
