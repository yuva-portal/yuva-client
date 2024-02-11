import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_ORIGIN, validation } from "../../utilities/constants";

import css from "../../css/admin/users-page.module.css";

const FileUpload = () => {

  const [fileUploaded, setFileUploaded] = useState(false);
  const [excelData, setExcelData] = useState(null);
  const [correctFormat, setCorrectFormat] = useState(false);

  function handleFileRetrieve(e){
    setFileUploaded(true);
    const excelFile = e.target.files[0];

    setExcelData(excelFile);
  }

  function handleFileUpload(){

      const file = excelData;
  
      const formData = new FormData();
      formData.append('file', file);
      // console.log("--------------",file);
  
      axios.post(`${SERVER_ORIGIN}/api/admin/auth/users/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          // console.log("*******" + response.data);
          setCorrectFormat(true);
          setFileUploaded(false);
          window.location.reload();
        })
        .catch((error) => {
          alert("Not uploaded");
          setFileUploaded(false);
          // console.log(error);
        });


  }

  return (
    <div>
      {/* <form className={css.fileDiv} onSubmit={handleExelDataSubmit}> */}
                    <div className={css.innerFileDiv}>
                        <label
                            htmlFor="inputTag"
                            className={`${css.fileUploadBtn} commonBtn`}
                        >
                            Select Excel File
                            <input
                                id="inputTag"
                                type="file"
                                onChange={handleFileRetrieve}
                                accept=".xlsx, .xls"
                                className={css.fileInput}
                            />
                        </label>
                        {fileUploaded ? (
                            <h3 className={css.fileUploaded}>
                                Excel data retrieved successfully. Press the 'Upload' button to upload the file.
                            </h3>
                        ) : correctFormat && (
                            <h3 className={css.fileUploaded}>
                                The data has been successfully uploaded.
                            </h3>
                        )}
                    </div>
                    <button
                        // type="submit"
                        onClick={handleFileUpload}
                        className={`${css.fileUploadBtn} commonBtn`}
                    >
                        Upload
                    </button>
                {/* </form> */}
    </div>
  );
};

// const dropZoneWrapper = {
//   paddingInline: '20%',
// }

// const dropzoneStyles = {
//   border: '2px dashed #cccccc',
//   borderRadius: '4px',
//   padding: '20px',
//   textAlign: 'center',
//   cursor: 'pointer',
// };

export default FileUpload;

// <div style={dropZoneWrapper}>
//       <div {...getRootProps()} style={dropzoneStyles}>
//         {/* <input type='file' {...getInputProps()} /> */}
//         {/* <button onClick={inputPropsFunction}>click</button> */}
//         <p>Drag and drop a file here, or click to select a file</p>
//         <form>

//           <input type="file"></input>
//         </form>
//       </div>
//     </div>