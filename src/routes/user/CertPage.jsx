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

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import cert_img from "./cert_new.png"




// My components
import Cert from "../../components/user/Cert";
import SecCard from "../../components/common/SecCard";
import Loader from "../../components/common/Loader";

// My css
import css from "../../css/user/cert-page.module.css";

// import { downloadCertificate } from "../../utilities/helper_functions";

import { SERVER_ORIGIN } from "../../utilities/constants";

//!
import "./cert_new.css";
import cert_bg from "./cert_new.png";
//!

const CertPage = () => {
    const [certInfo, setCertInfo] = useState({
        holderName: "",
        passingDate: "",
        courseName: "",
        unitId: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isCertValid, setIsCertValid] = useState(true);

    const params = useParams();
    // console.log(params);

    const certPagePublicURL = window.location.href;
    // console.log(certPagePublicURL);

    useEffect(() => {
        const getCert = async () => {
            setIsLoading(true);

            const certId = params.certId;
            //   console.log("CertPage certId: ", certId);

            try {
                const userId = process.env.REACT_APP_USER_ID;
                const userPassword = process.env.REACT_APP_USER_PASSWORD;
                const basicAuth = btoa(`${userId}:${userPassword}`);
                const response = await fetch(
                    `${SERVER_ORIGIN}/api/public/certificate/${certId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Basic ${basicAuth}`,
                        },
                    }
                );

                const result = await response.json();
                // console.log(result);
                if (result.success === false) {
                    setIsCertValid(false);
                    setIsLoading(false);
                    return;
                }
                setIsCertValid(true);

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

    // const downloadCertificate = (certInfo) => {
    //     const doc = new jsPDF("l", "mm", "a4"); // Set the PDF size to A4 (landscape)

    //     const pageWidth = doc.internal.pageSize.getWidth();
    //     const pageHeight = doc.internal.pageSize.getHeight();

    //     const fontSize = 35; // Adjust the font size as needed

    //     doc.addImage(cert_img, "PNG", 0, 0, pageWidth, pageHeight);

    //     // Insert dynamic content
    //     doc.setFont("Allura", "cursive", "cursive");
    //     doc.setFontSize(fontSize);

    //     // Calculate text width for centering
    //     const nameText = certInfo.holderName;
    //     const nameWidth = doc.getStringUnitWidth(nameText) * fontSize;
    //     // console.log(pageWidth);
    //     // const nameX = (pageWidth ) / 2;
    //     const nameX = 110;

    //     // Insert the name
    //     doc.text(certInfo.holderName, nameX, 75);

    //     // Insert the course info
    //     doc.setFont("Sans-serif", "normal", "normal");
    //     doc.setFontSize(fontSize - 10);

    //     // Limit the height to prevent overflow
    //     const courseInfoText = doc.splitTextToSize(
    //         `has successfully completed a module which is a part of the course "${certInfo.courseName}" "${certInfo.courseName}" on  ${certInfo.passingDate}`,
    //         pageWidth - 40,
    //         {}
    //     );

    //     const courseInfoX = 20;
    //     const courseInfoY = 90; // Adjust the Y position as needed

    //     doc.text(courseInfoText, courseInfoX, courseInfoY);

    //     // Download
    //     doc.save(certInfo.fileName);
    // };
    const downloadCertificate = (certInfo) => {
        const doc = new jsPDF("l", "mm", "a4"); // Set the PDF size to A4 (landscape)
      
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
      
        const fontSize = 35; // Adjust the font size as needed
      
        doc.addImage(cert_img, "PNG", 0, 0, pageWidth, pageHeight);
      
        // Insert dynamic content
        doc.setFont("Allura", "normal", "normal");
        doc.setFontSize(fontSize);
      
        // Calculate text width for centering
        const nameText = certInfo.holderName;
        const nameWidth = doc.getStringUnitWidth(nameText) * fontSize;
        const nameX = (pageWidth - nameWidth) / 2;
      
        // Insert the name with Allura (cursive) font
        doc.text(certInfo.holderName, 110, 75);
      
        // Insert the course info centered
        doc.setFont("Sans-serif", "normal", "normal");
        doc.setFontSize(fontSize - 4);
      
        // Limit the height to prevent overflow
        const courseInfoText = doc.splitTextToSize(
          `has successfully completed a unit which is a part of the course "${certInfo.courseName}"`,
          pageWidth - 40
        );
      
        const courseInfoX = (pageWidth - doc.getTextDimensions(courseInfoText[0]).w) / 2;
        let courseInfoY = (pageHeight - (courseInfoText.length * doc.getTextDimensions(courseInfoText[0]).h)) / 2;
      
        courseInfoText.forEach((line) => {
          doc.text(line, courseInfoX, courseInfoY);
          courseInfoY += doc.getTextDimensions(line).h;
        });
      
        // Add "on [date]" together if it fits, otherwise wrap to a new line
        const fullDateText = `on ${certInfo.passingDate}`;
        const fullDateTextWidth = doc.getTextDimensions(fullDateText).w;
      
        if (courseInfoText[0] && fullDateTextWidth <= doc.getTextDimensions(courseInfoText[0]).w) {
          doc.text(fullDateText, courseInfoX, courseInfoY + 15);
        } else {
          courseInfoY += 15; // Adjust vertical spacing as needed
          doc.text(fullDateText, pageWidth / 2, courseInfoY, { align: "center" });
        }
      
        // Download
        doc.save(certInfo.fileName);
      };
      
      


    const handleCertPDFDownload = () => {
        // console.log("downloading");

        // const certFileName = `Yuva_${certInfo.holderName}_${certInfo.unitId}`;
        const certFileName = `Yuva_${certInfo.holderName}_certificate`;

        downloadCertificate({ ...certInfo, fileName: certFileName });
    };

   
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : isCertValid ? (
                <div className={css.outerDiv}>
                    <div className="row">

                        {/* //! OLD CERTIFICATE */}
                        {/* <div className="col-lg-8">
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
            </div> */}

                        {/* //!NEW CERT */}
                        
                        <div className="col-lg-8">
                            <div className="certificate" id="certificate">
                                <img src={cert_bg} alt="Certificate Background" className="certificate-background" />
                                <div className="text-overlay">
                                    <div className="name">{certInfo.holderName}</div>
                                    <div className="course-info">{`has successfully completed a module which is a part of the course '${certInfo.courseName}` }' <span className="date"> on {certInfo.passingDate}</span></div>
                                </div>
                            </div>
                        </div>

                        {/* //!NEW CERT */}

                        <div className="col-lg-4">
                            <div className={css.certInfoDiv}>
                                <p className={css.holderText}>Certificate holder name:</p>
                                <h3 className={css.holderName}>{certInfo.holderName}</h3>

                                <p className={css.holderText}>Course name:</p>
                                <h3 className={css.holderName}>{certInfo.courseName}</h3>

                                <hr></hr>

                                <button
                                    className={css.downloadBtn}
                                    // onClick={handleCertPDFDownload}
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
            ) :
                <>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh', // Makes the container take the full height of the viewport
                        textAlign: 'center',
                    }}>
                        <p>This certificate is invalid.</p>
                        <p>Please visit <a href="https://yuvaportal.youngindians.net/">https://yuvaportal.youngindians.net/</a> to get a valid certificate.</p>
                    </div>
                </>

            }
        </>
    );
};

export default CertPage;
