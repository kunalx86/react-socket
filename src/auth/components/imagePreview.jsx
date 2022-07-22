import { useState } from "react"

function ImagePreview({ file }) {
  const [img, setImg] = useState(null);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => setImg(reader.result);
  return img && <img width="50px" height="50px" src={img} />;
};

export default ImagePreview;