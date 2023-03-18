import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// My components
import Card from "../../components/user/Card";
import HeaderCard from "../../components/common/HeaderCard";
import Loader from "../../components/common/Loader";
import { CardGrid } from "../../components/common/CardGrid";

// My css
import homeCss from "../../css/user/home-page.module.css";
import vCss from "../../css/user/verticals-page.module.css";

import { SERVER_ORIGIN } from "../../utilities/constants";
import logo from "../../assets/images/yuva_logo.png";

///////////////////////////////////////////////////////////////////////////////////////////////////

const HomePage = () => {
  const [allVerticals, setAllVerticals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllVerticals() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${SERVER_ORIGIN}/api/user/auth/verticals/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        // console.log(result);

        if (response.status >= 400 && response.status < 600) {
          if (response.status === 500) {
            toast.error(result.statusText);
          }
        } else if (response.ok && response.status === 200) {
          setAllVerticals(result.allVerticals);
        } else {
          // for future
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    }

    getAllVerticals();
  }, []);

  function handleViewCourses(e) {
    const verticalId = e.target.id;
    // console.log(verticalId);
    navigate(`/user/verticals/${verticalId}/courses/all`);
  }

  const element = (
    <>
      <HeaderCard>
        <p className={vCss.headerText}>Here's what we have got for you !</p>
      </HeaderCard>
      <section id="verticals">
        {allVerticals.length > 0 ? (
          <CardGrid>
            {allVerticals.map((vertical) => (
              <div
                className="col-lg-4 col-md-6 col-sm-12"
                style={{ padding: "10px" }}
                key={vertical._id}
              >
                <Card
                  data={vertical}
                  type="vertical"
                  onClick={handleViewCourses}
                />
              </div>
            ))}
          </CardGrid>
        ) : (
          <h1>EMPTY</h1>
        )}
      </section>
    </>
  );

  return (
    <>
      <div className={`${homeCss.outerDiv} row`}>
        <div className={`col-lg-8 col-md-8 col-sm-8 ${homeCss.introDiv}`}>
          <p className={homeCss.introHeading}>Welcome to YUVA Portal</p>
          <p className={homeCss.introSubheading}>
            We Are The Voice Of Young Indians Globally
          </p>
          <p className={homeCss.introDesc}>
            YUVA is one of the most active focus areas within Young Indians by
            which Yi members engage students from across the country in various
            initiatives that the students conceptualize, plan and execute. The
            objective is to create a bridge, a platform for the students to work
            in cross functional teams with a broad objective of enhancing their
            leadership skills and giving back to the nation.
          </p>
          <button className={homeCss.aboutBtn}>More about Yuva</button>
          <button className={homeCss.exploreBtn}>Explore Verticals</button>
        </div>
        <div
          style={{ textAlign: "right" }}
          className="col-lg-4 col-md-4 col-sm-4"
        >
          <img src={logo} className={homeCss.yuvaImg} alt="yuva-big-img"></img>
        </div>
      </div>

      {isLoading ? Loader : element}
    </>
  );
};

export default HomePage;
