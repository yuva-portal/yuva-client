import React from 'react'
import { Link } from "react-router-dom";
import {
    BsFacebook,
    BsInstagram,
    BsLinkedin,
    BsTwitter,
    BsYoutube,
  } from "react-icons/bs";
import logo from "../../assets/images/yuva_logo.png";
import "../../css/user/u-about-page.css";

const Footer = () => {
  return (
    <>
    <div  className='u-about-page-outer-div'>

    <div className="u-about-page-landing-hr "></div>
      <div className="u-about-page-landing-footer">
        <div className="u-about-page-landing-footer-links">
          <div className="u-about-page-landing-footer-row">
            <Link to={"#"} className="u-about-page-landing-footer-link">
              Home
            </Link>
            <Link to={"#"} className="u-about-page-landing-footer-link">
              Contact Us
            </Link>
            <Link to={"#"} className="u-about-page-landing-footer-link">
              Our Team
            </Link>
            <Link to={"#"} className="u-about-page-landing-footer-link">
              Photo Gallery
            </Link>
          </div>
          <div className="u-about-page-landing-footer-row">
            <Link to={"#"} className="u-about-page-landing-footer-link">
              Members
            </Link>
            <Link to={"#"} className="u-about-page-landing-footer-link">
              Our Reach
            </Link>
            <Link to={"#"} className="u-about-page-landing-footer-link">
              Accessibility
            </Link>
            <Link to={"#"} className="u-about-page-landing-footer-link">
              Genesis of Yi
            </Link>
          </div>
        </div>
        <div className="u-about-page-landing-vr"></div>
        <div className="u-about-page-landing-footer-right">
          <div className="u-about-page-landing-footer-social">
            <Link to={"#"} className="u-about-page-landing-footer-icon">
              <BsFacebook fontSize={24} />
            </Link>
            <Link to={"#"} className="u-about-page-landing-footer-icon">
              <BsTwitter fontSize={24} />
            </Link>
            <Link to={"#"} className="u-about-page-landing-footer-icon">
              <BsYoutube fontSize={24} />
            </Link>
            <Link to={"#"} className="u-about-page-landing-footer-icon">
              <BsInstagram fontSize={24} />
            </Link>
            <Link to={"#"} className="u-about-page-landing-footer-icon">
              <BsLinkedin fontSize={24} />
            </Link>
          </div>
          <img src={logo} alt="" className="u-about-page-landing-yuva-logo" />
        </div>
        </div>
      </div>
    </>
  )
}

export default Footer