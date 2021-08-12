////Used to get height and width of image for nextjs Image component
//file can be file or blob
export const getImageData = (file) => {
  return new Promise((resolve) => {
    if (file.type.split("/")?.[0] === "image") {
      //new HTMLImageElement
      let img = new Image();
      //DOMString with unique blob url
      let objectUrl = URL.createObjectURL(file);
      img.onload = (event) => {
        let image = event.target;
        resolve({ height: image.height, width: image.width });
        //remove DOMString
        URL.revokeObjectURL(objectUrl);
      };
      img.src = objectUrl;
    } else {
      resolve({ height: undefined, width: undefined });
    }
  });
};
