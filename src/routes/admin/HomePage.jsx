import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// My components
import HeaderCard from "../../components/common/HeaderCard";
import { CardGrid } from "../../components/common/CardGrid";
import SecCard from "../../components/common/SecCard";

// My css
import css from "../../css/admin/home-page.module.css";

import { SERVER_ORIGIN } from "../../utilities/constants";
import Loader from "../../components/common/Loader";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function canVisitPage() {
      setIsLoading(true);

      try {
        const response = await fetch(
          `${SERVER_ORIGIN}/api/admin/auth/verify-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        const result = await response.json();
        // console.log(result);

        if (response.status >= 400 && response.status < 600) {
          if (response.status === 401) {
            navigate("/admin/login");
          }
        } else if (response.ok && response.status === 200) {
        } else {
          // for future
        }
      } catch (err) {
        // console.log(err.message);
      }

      setIsLoading(false);
    }

    canVisitPage();
  }, []);

  function handleServiceClick() {
    navigate("/admin/verticals/all");
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className={css.outerDiv}>
      <HeaderCard>
        <h1 className="headerTitle">Welcome to the platform analysis</h1>
        <hr />
        <p className="headerSubtitle">
          Here are the services we provide to you
        </p>
      </HeaderCard>
      <CardGrid>
        <div className="cardOuterDiv col-lg-6 col-md-6 col-sm-12" key={1}>
          <SecCard>
            <h1 className={css.serviceName}>Verticals</h1>
            <p className={css.serviceDesc}>
              You can manage all the verticals from here
            </p>
            <button
              className={`${css.serviceBtn} commonBtn`}
              onClick={handleServiceClick}
            >
              Manage verticals
            </button>
          </SecCard>
        </div>
      </CardGrid>
    </div>
  );
};

export default HomePage;
