import { Route, Switch } from "react-router-dom";
import NoMatch from "./NoMatch";
import Header from "./Header";
import Login from "./Login";
import Home from "./Home";
import Signup from "./Signup";
import SinglePost from './SinglePost'
function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/article/:slug" component={SinglePost}>
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
      
    </>
  );
}

export default App;
