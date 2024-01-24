import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// My components
import Loader from "../../components/common/Loader";
import Card from "../../components/user/Card";
import { CardGrid } from "../../components/common/CardGrid";
import HeaderCard from "../../components/common/HeaderCard";

// My css
import css from "../../css/user/verticals-page.module.css";

import { SERVER_ORIGIN } from "../../utilities/constants";

//! If allVerticals is empty, then it will throw an error when using map function on an empty array because the accessed fields like vertical.name/vertical.desc will not be present, so make a check

///////////////////////////////////////////////////////////////////////////////////////////

const VerticalsPage = () => {
  // const [allVerticals, setAllVerticals] = useState([]);
  const [projectVerticals, setProjectVerticals] = useState([]); // [vertical1, vertical2]
  const [initiativeVerticals, setInitiativeVerticals] = useState([]); // [vertical3, vertical4, vertical5, vertical6]
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllVerticals() {
      setIsLoading(true);

      try {
        const userId = process.env.REACT_APP_USER_ID;
        const userPassword = process.env.REACT_APP_USER_PASSWORD;
        const basicAuth = btoa(`${userId}:${userPassword}`);
        const response = await fetch(
          `${SERVER_ORIGIN}/api/user/auth/verticals/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${basicAuth}`,
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
          setProjectVerticals(result.allVerticals?.slice(0, 2));
          setInitiativeVerticals(result.allVerticals?.slice(2));
          // setAllVerticals(result.allVerticals);
        } else {
          // for future
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log("In catch");
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

  const loader = <Loader />;

  const element = (
    <div className={css.outerDiv}>
      <HeaderCard>
        <p className={css.headerText}>Here's what we have got for you !</p>
      </HeaderCard>

      <section id="projects" className="mt-5 d-flex flex-column gap-5">
        <h1 className={css.headerText}>Our Projects</h1>
        <CardGrid className={css["card-grid-verticals"]}>
          {projectVerticals.map((vertical) => (
            <div
              className="col-lg-6 col-md-6 col-sm-12 cardOuterDiv"
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
      </section>

      <section id="initiatives" className="mt-5 d-flex flex-column gap-5">
        <h1 className={css.headerText}>Our Initiatives</h1>
        <CardGrid>
          {initiativeVerticals.map((vertical) => (
            <div
              className="col-lg-6 col-md-6 col-sm-12 cardOuterDiv"
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
      </section>
    </div>
  );

  return <>{isLoading ? loader : element}</>;
};

export default VerticalsPage;
