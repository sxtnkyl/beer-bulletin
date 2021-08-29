import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as C from "@material-ui/core";
import { ContactsOutlined } from "@material-ui/icons";
import PropTypes from "prop-types";

//To Pull  apiData, baseApiUrl, token
const ImageUpload = forwardRef(
  ({ baseApiUrl, setProfileUrl, profileUrl }, ref) => {
    const [fileInput, setFileInput] = useState("");
    const [imgPreview, setImgPreview] = useState("");
    const [selectedFile, setSelectedFile] = useState();

    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileInput(e.target.value);
    };

    //Loads into FileReader and sends to uploadFile
    useImperativeHandle(ref, () => ({
      handleUpload(callbackFn) {
        // e.preventDefault();
        //If no file is selected
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
          fetch(`${baseApiUrl}/images/img_upload/`, {
            method: "POST",
            body: JSON.stringify({ data: reader.result }),
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              callbackFn(data.secure_url);
            });
          //  uploadFile(reader.result);
        };
        reader.onerror = () => {
          setErrMsg("Something Went wrong with file read");
        };
      },
    }));

    // const uploadFile = async (base64Img) => {
    //   return fetch(`${baseApiUrl}/images/img_upload/`, {
    //     method: "POST",
    //     body: JSON.stringify({ data: base64Img }),
    //     headers: { "Content-Type": "application/json" },
    //   })
    //     .then((res) => {
    //       return res.json();
    //     })
    //     .then((data) => {
    //       console.log("HERE", data.secure_url);
    //       setProfileUrl(data.secure_url);
    //       setFileInput("");
    //     });
    // };

    return (
      <C.Button variant="contained" component="label">
        Upload File
        <input
          className="fileInput mb-2"
          onChange={handleFileInputChange}
          type="file"
          accept=".jpg, .png, .jpeg"
          // hidden
        ></input>
      </C.Button>
    );
  }
);

ImageUpload.displayName = "ImageUpload";

ImageUpload.propTypes = {
  baseApiUrl: PropTypes.string,
};

export default ImageUpload;
