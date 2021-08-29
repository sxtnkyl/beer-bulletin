import React, { useEffect, useState } from "react";
import * as C from "@material-ui/core";
import { ContactsOutlined } from "@material-ui/icons";

//To Pull  apiData, baseApiUrl, token
export default function ImageUpload(props) {
  const [fileInput, setFileInput] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileInput(e.target.value);
  };

  //Loads into FileReader and sends to uploadFile
  const handleUpload = (e) => {
    e.preventDefault();
    //If no file is selected
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadFile(reader.result);
    };
    reader.onerror = () => {
      setErrMsg("Something Went wrong with file read");
    };
  };

  const uploadFile = async (base64Img) => {
    return fetch(`${props.baseApiUrl}/images/img_upload/`, {
      method: "POST",
      body: JSON.stringify({ data: base64Img }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        props.setProfileUrl(data.secure_url);
        setFileInput("");
      });
  };

  return (
    <div>
      <input
        className="fileInput mb-2"
        onChange={handleFileInputChange}
        type="file"
        accept=".jpg, .png, .jpeg"
      ></input>
      <div>
        <button onClick={handleUpload} disabled={!selectedFile}>
          Upload
        </button>
      </div>
    </div>
  );
}
