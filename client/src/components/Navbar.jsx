import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";
import { FaUser, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

export const Navbar = () => {
  const { isLoggedIn , user} = useAuth();
  console.log(user.isAdmin);
  return (
    <>
    {(user.isAdmin)? (<><header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users">
                <FaUser />  users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">
                <FaMessage /> Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/service">
                <FaRegListAlt /> Services
                </NavLink>
              </li>

              <li>
                <NavLink to="/">
                <FaHome /> Home
                </NavLink>
              </li>
              {isLoggedIn ? (
                <li>
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register"> Register </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login"> Login </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header></>) : (<><header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">Narmada Technical</NavLink>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/"> Home </NavLink>
              </li>
              <li>
                <NavLink to="/about"> About </NavLink>
              </li>
              <li>
                <NavLink to="/service"> Services </NavLink>
              </li>
              <li>
                <NavLink to="/contact"> Contact </NavLink>
              </li>

              {isLoggedIn ? (
                <li>
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register"> Register </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login"> Login </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header></>)}
     
     
    </>
  );
};