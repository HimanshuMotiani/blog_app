import { NavLink } from 'react-router-dom'
function Header() {
  return (
    <>
      <header className="navbar">
        <div className="container flex justify-between item-center">
          <NavLink className="brand" to="/">
            <h5 className="text-2xl primColor py-4">conduit</h5>
          </NavLink>
          <nav>
            <ul className="flex item-center py-4">
              <li className="nav-item mr-4 text-xl">
                <NavLink activeClassName="active" to="/" exact>
                  Home
                </NavLink>
              </li>
              <li className="nav-item  mr-4 text-xl">
                <NavLink activeClassName="active" to="/login">SignIn</NavLink>
              </li>
              <li className="nav-item text-xl">
                <NavLink activeClassName="active" to="/signup">SignUp</NavLink>
              </li>
              
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
