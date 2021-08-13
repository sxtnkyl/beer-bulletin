////upload hook based on-
//https://www.npmjs.com/package/next-s3-upload

import React from "react";
import { useRef, useState } from "react";
import { forwardRef } from "react";
import S3 from "aws-sdk/clients/s3";

//typeof HTMLInputElement- use as input component for file upload
let FileInput = forwardRef(
  ({ onChange = () => {}, ...restOfProps }, forwardedRef) => {
    let handleChange = (event) => {
      let file = event.target?.files?.[0];
      onChange(file, event);
    };

    return (
      <input
        onChange={handleChange}
        {...restOfProps}
        ref={forwardedRef}
        type="file"
      />
    );
  }
);

//util function for reading file/blob from input of type="file"
let getFileContents = (file) => {
  return new Promise((resolve) => {
    //https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    let reader = new FileReader();
    reader.onload = (readEvent) => {
      resolve(readEvent.target.result);
    };
    reader.readAsArrayBuffer(file);
  });
};

export const useS3Upload = () => {
  let ref = useRef();
  let [files, setFiles] = useState([]);

  //ref handler linking <FileInput />
  //add to onClick of button
  let openFileDialog = () => {
    if (ref.current) {
      ref.current.value = "";
      ref.current.click();
    }
  };

  let uploadToS3 = async (file) => {
    let filename = encodeURIComponent(file.name);
    let res = await fetch(`/api/s3-connect?filename=${filename}`);
    let data = await res.json();

    if (data.error) {
      console.error(data.error);
      throw data.error;
    } else {
      //https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
      let s3 = new S3({
        accessKeyId: data.token.Credentials.AccessKeyId,
        secretAccessKey: data.token.Credentials.SecretAccessKey,
        sessionToken: data.token.Credentials.SessionToken,
        region: data.region,
      });

      //pass img data in body
      let blob = await getFileContents(file);

      let params = {
        ACL: "public-read",
        Bucket: data.bucket,
        Key: data.key,
        Body: blob,
        CacheControl: "max-age=630720000, public",
        ContentType: file.type,
      };

      let s3Upload = s3.upload(params);

      setFiles((files) => [
        ...files,
        { file, progress: 0, uploaded: 0, size: file.size },
      ]);

      s3Upload.on("httpUploadProgress", (event) => {
        if (event.total) {
          setFiles((files) =>
            files.map((trackedFile) =>
              trackedFile.file === file
                ? {
                    file,
                    uploaded: event.loaded,
                    size: event.total,
                    progress: (event.loaded / event.total) * 100,
                  }
                : trackedFile
            )
          );
        }
      });

      let uploadResult = await s3Upload.promise();

      return {
        url: uploadResult.Location,
        bucket: uploadResult.Bucket,
        key: uploadResult.Key,
      };
    }
  };

  return {
    FileInput: (props) => (
      <FileInput {...props} ref={ref} style={{ display: "none" }} />
    ),
    openFileDialog,
    uploadToS3,
    files,
  };
};
