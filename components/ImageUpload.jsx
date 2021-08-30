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
  ({ baseApiUrl, oldData, setSelectedUpload }, ref) => {
    const [fileInput, setFileInput] = useState("");
    const [imgPreview, setImgPreview] = useState("");
    const [selectedFile, setSelectedFile] = useState();

    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      previewImg(file);
      setSelectedFile(file);
      if (setSelectedUpload) setSelectedUpload(true);
      setFileInput(e.target.value);
    };

    const previewImg = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
    };

    //Loads into FileReader and sends to uploadFile
    useImperativeHandle(ref, () => ({
      handleUpload(callbackFn) {
        // e.preventDefault();
        //If no file is selected
        if (!selectedFile) {
          if (oldData) {
            callbackFn(oldData);
            return;
          } else {
            callbackFn(null);
            return;
          }
        }

        ///Compresses image to 64Encoded for space
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
              setFileInput("");
              setSelectedFile("");
              setImgPreview("");
            });
          //  uploadFile(reader.result);
        };
        reader.onerror = () => {
          setErrMsg("Something Went wrong with file read");
        };
      },
    }));

    return (
      <>
        <C.Button
          variant="contained"
          component="label"
          style={{ maxWidth: "160px" }}
        >
          Upload File
          <input
            className="fileInput mb-2"
            onChange={handleFileInputChange}
            type="file"
            accept=".jpg, .png, .jpeg"
            hidden
          ></input>
        </C.Button>

        {imgPreview && (
          <img
            src={imgPreview}
            alt="chosen"
            style={{
              height: "100px",
              width: "100px",
              alignSelf: "flex-start",
              m: "30px",
            }}
          />
        )}
      </>
    );
  }
);

ImageUpload.displayName = "ImageUpload";

ImageUpload.propTypes = {
  baseApiUrl: PropTypes.string,
  oldData: PropTypes.string,
  setSelectedUpload: PropTypes.func,
};

export default ImageUpload;
