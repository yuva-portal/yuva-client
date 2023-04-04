import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

// My components
import Cert from "../../components/user/Cert";
import SecCard from "../../components/common/SecCard";
import Loader from "../../components/common/Loader";

// My css
import css from "../../css/user/cert-page.module.css";

import { downloadCertificate } from "../../utilities/helper_functions";

import { SERVER_ORIGIN } from "../../utilities/constants";

const CertPage = () => {
  const [certInfo, setCertInfo] = useState({
    holderName: "",
    passingDate: "",
    courseName: "",
    unitId: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  // console.log(params);

  const certPagePublicURL = window.location.href;
  // console.log(certPagePublicURL);

  useEffect(() => {
    const getCert = async () => {
      setIsLoading(true);
      const certId = params.certId;

      try {
        const response = await fetch(
          `${SERVER_ORIGIN}/public/certificate/${certId}`,
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
          if (response.status === 404) {
            // invalid cert id
          } else {
            alert("Internal server error"); // todo: toast notify
          }
        } else if (response.ok && response.status === 200) {
          setCertInfo(result.certInfo);
        } else {
          // for future
        }

        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    getCert();
  }, []);

  const handleCertPDFDownload = () => {
    // console.log("downloading");

    const certFileName = `Yuva_${certInfo.holderName}_${certInfo.unitId}`;

    downloadCertificate({ ...certInfo, fileName: certFileName });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={css.outerDiv}>
          <div className="row">
            <div className="col-lg-8">
              <Cert certInfo={certInfo} />

              <div className={css.certDescDiv}>
                <div className={css.certInfoDiv}>
                  <p className="text-ff2">
                    This certificate above verifies that{" "}
                    <span className="text-underline">
                      {certInfo.holderName}
                    </span>{" "}
                    has successfully completed a unit which is a part of the
                    course{" "}
                    <span className="text-underline">
                      {certInfo.courseName}
                    </span>{" "}
                    on{" "}
                    <span className="text-underline">
                      {certInfo.passingDate}
                    </span>{" "}
                    on Yuva Portal.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className={css.certInfoDiv}>
                <p className={css.holderText}>Certificate holder name:</p>
                <h3 className={css.holderName}>{certInfo.holderName}</h3>

                <p className={css.holderText}>Course name:</p>
                <h3 className={css.holderName}>{certInfo.courseName}</h3>

                <hr></hr>

                <button
                  className={css.downloadBtn}
                  onClick={handleCertPDFDownload}
                >
                  Download PDF
                </button>
                <p className={css.shareText}>Or share on</p>
                <div className={css.shareBtnDiv}>
                  <LinkedinShareButton url={certPagePublicURL}>
                    <LinkedinIcon
                      className={css.shareIcon}
                      size={55}
                      round={true}
                    />
                  </LinkedinShareButton>

                  <FacebookShareButton url={certPagePublicURL}>
                    <FacebookIcon
                      className={css.shareIcon}
                      size={55}
                      round={true}
                    />
                  </FacebookShareButton>

                  <TwitterShareButton url={certPagePublicURL}>
                    <TwitterIcon
                      className={css.shareIcon}
                      size={55}
                      round={true}
                    />
                  </TwitterShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CertPage;
