import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";
function Header(props) {
  let {isLoggedIn} = useContext(UserContext)
  return (
    <>
      <header className="navbar">
        <div className="container flex justify-between item-center">
          <NavLink className="brand" to="/">
            <h5 className="text-2xl primColor py-4">conduit</h5>
          </NavLink>
          <nav>
            {isLoggedIn ? (
              <AuthHeader/>
            ) : (
              <NonAuthHeader />
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

function NonAuthHeader() {
  return (
    <ul className="flex item-center py-4">
      <li className=" mr-4 text-xl">
        <NavLink activeClassName="active" to="/" exact>
          Home
        </NavLink>
      </li>
      <li className="  mr-4 text-xl">
        <NavLink activeClassName="active" to="/login">
          SignIn
        </NavLink>
      </li>
      <li className=" text-xl">
        <NavLink activeClassName="active" to="/signup">
          SignUp
        </NavLink>
      </li>
    </ul>
  );
}

function AuthHeader() {
  let {user} = useContext(UserContext)
  return (
    <ul className="flex item-center py-4">
      <li className="text-gray-400  mr-8 text-xl">
        <NavLink activeClassName="active" to="/" exact>
          Home
        </NavLink>
      </li>
      <li className=" text-gray-400 mr-8 text-xl">
        <i className="fas fa-edit mr-1"></i>
        <NavLink activeClassName="active" to="/new_post">
          New Article
        </NavLink>
      </li>
      <li className="text-gray-400  mr-8 text-xl">
        <i class="fa fa-gear mr-1"></i>
        <NavLink activeClassName="active" to="/settings">
          Settings
        </NavLink>
      </li>
      <li className="text-gray-400  text-xl">
        <i class="fa fa-user mr-1"></i>
        <NavLink activeClassName="active" to="/profile">
          {user.username}
        </NavLink>
      </li>
    </ul>
  );
}

export default Header;
