import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as C from "@material-ui/core";
import { ContactsOutlined } from "@material-ui/icons";
import PropTypes from "prop-types";
import Image from "next/image";

//To Pull  apiData, baseApiUrl, token
const ImageUpload = forwardRef(
  (
    {
      baseApiUrl,
      oldData,
      setSelectedUpload,
      setToastStatus,
      setStateFormMessage,
      setLoading,
    },
    ref
  ) => {
    const [fileInput, setFileInput] = useState("");
    const [imgPreview, setImgPreview] = useState("");
    const [selectedFile, setSelectedFile] = useState();

    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      previewImg(file);
      setSelectedFile(file);
      setFileInput(e.target.value);
    };

    const previewImg = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImgPreview(reader.result);
        }
    }; 

    //Loads into FileReader and sends to uploadFile
    useImperativeHandle(ref, () => ({
      handleUpload(callbackFn) {
        // e.preventDefault();
        //If no file is selected
        if (!selectedFile) return;

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
            })
            .catch((error) => {
              if (setToastStatus) setToastStatus("error");
              if (setStateFormMessage)
                setStateFormMessage({
                  status: "error",
                  error: "File too large for upload",
                });
              if (setLoading) setLoading(false);
              setSelectedFile(null);
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
          Upload Picture
          <input
            className="fileInput mb-2"
            onChange={handleFileInputChange}
            type="file"
            accept=".jpg, .png, .jpeg"
            hidden
          ></input>
        </C.Button>

        {imgPreview && (
          <Image
            src={imgPreview}
            alt="chosen"
            width={100}
            height={100}
            style={{
              alignSelf: "flex-start",
              marginLeft: "30px",
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
  setToastStatus: PropTypes.func,
  setStateFormMessage: PropTypes.func,
  setLoading: PropTypes.func,
};

export default ImageUpload;
