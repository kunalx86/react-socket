import { useCallback, useContext, useState } from "react";
import AuthContext from "./context";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Auth Context should be used within Auth Provider")
  return context;
}

export function useFirebaseStorage() {
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("READY"); // READY | UPLOADING | SUCCESS | ERROR
  const [percent, setPercent] = useState(0);

  const handleUpload = useCallback(() => {
    if (!file) throw new Error("File cannot be empty");
    const storageRef = ref(storage, `/profiles/${file.name}-${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask
      .on("state_changed", snapshot => {
        if (status != "UPLOADING") setStatus("UPLOADING");
        const percent_ = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setPercent(percent_)
      },
        err => {
          setStatus("ERROR");
          setError(err?.message || "Something went wrong");
        },
        async () => {
          const url_ = await getDownloadURL(uploadTask.snapshot.ref)
          setStatus("SUCCESS");
          setUrl(url_);
        }
      )
  }, [file]);

  return {
    file,
    setFile,
    status,
    percent,
    url,
    error,
    handleUpload
  }
}

export default useAuth;