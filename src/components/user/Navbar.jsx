import {React, useRef, useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/images/yi_logo.png";

// My css
import css from "../../css/user/navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleLoginClick = (e) => {
    setIsOpen(false)
    navigate("/user/login");
  };

  const handleLogoutClick = (e) => {
    localStorage.removeItem("token");
    setIsOpen(false)
    navigate("/user/login");
  };

  const handleRegisterClick = (e) => {
    setIsOpen(false)
    localStorage.removeItem("token");
    navigate("/user/register");
  };

  const listItemStyle = { fontSize: "0.9rem", fontWeight: "400" };

  return (
    <nav ref={navbarRef} className={`${css.outerNav} navbar navbar-expand-lg fixed-top`}>
      <Link onClick={()=>setIsOpen(false)} to="/" style={{ marginRight: "1rem" }}>
      
        <img src={img} alt="yi-logo" className={css.yiImg} />
      </Link>
      <button
    //   ref={navbarRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className= {`${isOpen? ``: "collapse"} navbar-collapse `} id="navbarCollapse">
        <ul className="navbar-nav mr-auto text-ff1">
          <li className="nav-item active">
            <Link onClick={()=>setIsOpen(false)} className="nav-link active" to="/" style={listItemStyle}>
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link
            onClick={()=>setIsOpen(false)}
              className="nav-link active"
              to="/user/verticals/all"
              style={listItemStyle}
            >
              Verticals
            </Link>
          </li>
          <li className="nav-item active">
            <Link
            onClick={()=>setIsOpen(false)}
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
