import React from "react";
import { useNavigate } from "react-router-dom";

// My components
import HeaderCard from "../../components/common/HeaderCard";
import { CardGrid } from "../../components/common/CardGrid";
import SecCard from "../../components/common/SecCard";

// My css
import css from "../../css/admin/home-page.module.css";

const HomePage = () => {
  const navigate = useNavigate();

  function handleServiceClick() {
    navigate("/admin/verticals/all");
  }

  return (
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
