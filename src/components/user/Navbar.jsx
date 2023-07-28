import {React, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/images/yi_logo.png";

// My css
import css from "../../css/user/navbar.module.css";
import { SERVER_ORIGIN} from "../../utilities/constants";


const Navbar = () => {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const verifyToken = async ()=>{
        const response = await fetch(
        `${SERVER_ORIGIN}/api/user/auth/verity-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        }
      );
      const result = await response.json();
      if(result.userDoc){
        setIsUserLoggedIn(true);
      }
    }

    
  }, [])
  

  const handleLoginClick = (e) => {
    navigate("/user/login");
  };

  const handleLogoutClick = (e) => {
    localStorage.removeItem("token");
    navigate("/user/login");
  };

  const handleRegisterClick = (e) => {
    localStorage.removeItem("token");
    navigate("/user/register");
  };

  const listItemStyle = { fontSize: "0.9rem", fontWeight: "400" };

  return (
    <nav className={`${css.outerNav} navbar navbar-expand-lg fixed-top`}>
      <Link to="/" style={{ marginRight: "1rem" }}>
        <img src={img} alt="yi-logo" className={css.yiImg} />
      </Link>
      <button
        type="button"
        className="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto text-ff1">
          <li className="nav-item active">
            <Link className="nav-link active" to="/" style={listItemStyle}>
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link
              className="nav-link active"
              to="/user/verticals/all"
              style={listItemStyle}
            >
              Verticals
            </Link>
          </li>
          <li className="nav-item active">
            <Link
              className="nav-link active"
              to="/about"
              style={listItemStyle}
            >
              About
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto">
          {localStorage.getItem("token") ? (
            <button
              className={`${css.navBtn} text-ff1 navbar-right`}
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                className={`${css.navBtn} text-ff1 navbar-right`}
                onClick={handleLoginClick}
              >
                Login
              </button>
              <button
                className={`${css.navBtn} text-ff1 navbar-right`}
                onClick={handleRegisterClick}
              >
                Register
              </button>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
