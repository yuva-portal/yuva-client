import React from "react";
import { Link } from "react-router-dom";
import "../../css/user/u-about-page.css";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import logo from "../../assets/images/yuva_logo.png";

const AboutPage = () => {
  return (
    <div className="u-about-page-outer-div">
      <div className="u-about-page-landing-div">
        <div className="u-about-page-landing-div-left">
          <p className="u-page-page-landing-heading">About Us</p>
          {/* <p className="u-about-page-landing-subheading">
            Your signature is all it takes to save a life.
          </p> */}
          <p className="u-about-page-landing-slogan">'We Can, We Will'</p>
        </div>
        <div className="u-about-page-landing-div-right">
          {/* <p className="u-about-page-landing-slogan">'We Can, We Will'</p> */}
          <img
            src="https://idronline.org/wp-content/uploads/2021/01/Graphic-of-diverse-youth-in-India_Youth-Bol.jpg"
            alt=""
            className="u-about-page-landing-slogan-bg"
          />
        </div>
      </div>
      <div>
        <p className="u-about-page-landing-l-heading">The 3 Pillars of Yi</p>
        <p className="u-about-page-landing-desc">
          Yi’s mission to strengthen the future of India gives a stage and voice
          to the country’s next generation of changemakers. It aims to instill
          in young minds the power of leadership, enhance the youth
          entrepreneurial ecosystem and create youth-led changes to build the
          nation. The robust framework of Yi and its vision is built on three
          significant pillars:
        </p>
      </div>
      {/* 1 hero */}
      <div
        className="u-about-page-landing-hero"
        style={{ backgroundColor: "var(--yuva-dark-green)" }}
      >
        <div className="u-about-page-landing-hero-left">
          <p className="u-about-page-landing-hero-heading">Youth Leadership</p>
          <p className="u-about-page-landing-hero-subheading">
            The first pillar of Yi believes that leaders aren’t born; they are
            made. It calls upon the students of India to recognize the leader in
            them through various leadership skill development programs, personal
            development programs and nation-building activities.
          </p>
        </div>
        <div className="u-about-page-landing-hero-right">
          <img
            src="https://youngindians.net/wp-content/uploads/2023/03/Youth-Leadership.jpg"
            alt="about-1"
            className="u-about-page-hero-img img-1"
          />
        </div>
      </div>
      {/* 2 hero */}
      <div
        className="u-about-page-landing-hero"
        style={{ backgroundColor: "var(--yuva-dark-orange)" }}
      >
        <div className="u-about-page-hero-right">
          <img
            src="https://youngindians.net/wp-content/uploads/2023/03/Nation-Building.jpg"
            alt="about-1"
            className="u-about-page-hero-img img-2"
          />
        </div>
        <div className="u-about-page-landing-hero-left">
          <p className="u-about-page-landing-hero-heading">Nation Building</p>
          <p className="u-about-page-landing-hero-subheading">
            The youth carry the baton of building an India that is
            self-sufficient, informed and on the path to development. The second
            pillar of Yi aims to give wings to the transformative power of
            India’s youth through various verticals that delve into present-day
            issues.
          </p>
        </div>
      </div>
      {/* 3 hero */}
      <div
        className="u-about-page-landing-hero"
        style={{ backgroundColor: "var(--yuva-dark-blue)" }}
      >
        <div className="u-about-page-landing-hero-left">
          <p className="u-about-page-landing-hero-heading">
            Thought Leadership
          </p>
          <p className="u-about-page-landing-hero-subheading">
            The third pillar of Yi aims to nudge the innate leader in today’s
            youth to give rise to a better India of tomorrow. It informs,
            engages and empowers the youth of India through a contributive
            movement of constructive action, collaborative reasoning and
            collective voice.
          </p>
        </div>
        <div className="u-about-page-hero-right">
          <img
            src="https://youngindians.net/wp-content/uploads/2023/03/Thought-Leadership.jpg"
            alt="about-1"
            className="u-about-page-hero-img img-1"
          />
        </div>
      </div>
      {/* Team section */}
      {/* <div className="u-about-page-landing-team">
        <p className="u-about-page-landing-l-heading">Meet our Team</p>
        <div className="u-about-page-landing-team-row">
          <div className="u-about-page-landing-team-card">
            <img
              src="https://petapixel.com/assets/uploads/2019/02/download-4-800x800.jpeg"
              alt=""
              className="u-about-page-landing-team-photo"
            />
            <p className="u-about-page-landing-team-heading">Tom Riddle</p>
            <p className="u-about-page-landing-team-subheading">CEO</p>
          </div>
          <div className="u-about-page-landing-team-card">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              alt=""
              className="u-about-page-landing-team-photo"
            />
            <p className="u-about-page-landing-team-heading">
              Ablus Dumbledore
            </p>
            <p className="u-about-page-landing-team-subheading">
              Executive Director
            </p>
          </div>{" "}
          <div className="u-about-page-landing-team-card">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              alt=""
              className="u-about-page-landing-team-photo"
            />
            <p className="u-about-page-landing-team-heading">
              Hermoine Granger
            </p>
            <p className="u-about-page-landing-team-subheading">
              Marketing Head
            </p>
          </div>{" "}
          <div className="u-about-page-landing-team-card">
            <img
              src="https://petapixel.com/assets/uploads/2019/02/download-4-800x800.jpeg"
              alt=""
              className="u-about-page-landing-team-photo"
            />
            <p className="u-about-page-landing-team-heading">Tom Riddle</p>
            <p className="u-about-page-landing-team-subheading">CEO</p>
          </div>{" "}
          <div className="u-about-page-landing-team-card">
            <img
              src="https://petapixel.com/assets/uploads/2019/02/download-4-800x800.jpeg"
              alt=""
              className="u-about-page-landing-team-photo"
            />
            <p className="u-about-page-landing-team-heading">Tom Riddle</p>
            <p className="u-about-page-landing-team-subheading">CEO</p>
          </div>
          <div className="u-about-page-landing-team-card">
            <img
              src="https://petapixel.com/assets/uploads/2019/02/download-4-800x800.jpeg"
              alt=""
              className="u-about-page-landing-team-photo"
            />
            <p className="u-about-page-landing-team-heading">Tom Riddle</p>
            <p className="u-about-page-landing-team-subheading">CEO</p>
          </div>
          <div className="u-about-page-landing-team-card">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              alt=""
              className="u-about-page-landing-team-photo"
            />
            <p className="u-about-page-landing-team-heading">
              Ablus Dumbledore
            </p>
            <p className="u-about-page-landing-team-subheading">
              Executive Director
            </p>
          </div>{" "}
          <div className="u-about-page-landing-team-card">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              alt=""
              className="u-about-page-landing-team-photo"
            />
            <p className="u-about-page-landing-team-heading">
              Hermoine Granger
            </p>
            <p className="u-about-page-landing-team-subheading">
              Marketing Head
            </p>
          </div>{" "}
          <div className="u-about-page-landing-team-card">
            <img
              src="https://petapixel.com/assets/uploads/2019/02/download-4-800x800.jpeg"
              alt=""
              className="u-about-page-landing-team-photo"
            />
            <p className="u-about-page-landing-team-heading">Tom Riddle</p>
            <p className="u-about-page-landing-team-subheading">CEO</p>
          </div>{" "}
          <div className="u-about-page-landing-team-card">
            <img
              src="https://petapixel.com/assets/uploads/2019/02/download-4-800x800.jpeg"
              alt=""
              className="u-about-page-landing-team-photo"
            />
            <p className="u-about-page-landing-team-heading">Tom Riddle</p>
            <p className="u-about-page-landing-team-subheading">CEO</p>
          </div>
        </div>
      </div> */}
      {/* Contact Section */}
      <div className="u-about-page-landing-reach">
        <p className="u-about-page-landing-l-heading">Reach Us</p>
        <div className="u-about-page-landing-reach-form">
          <div className="u-about-page-landing-reach-input-row">
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="First Name" />
          </div>
          <div className="u-about-page-landing-reach-input-row">
            <input type="text" placeholder="Last Name" />
            <input type="number" placeholder="Mobile Number" />
          </div>
          <textarea
            name="message"
            id=""
            cols="30"
            placeholder="Write a message"
            rows="10"
          ></textarea>
          <button className="u-about-page-landing-btn-1">Contact Us</button>
        </div>
      </div>
      
    </div>
  );
};

export default AboutPage;