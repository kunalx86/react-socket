import { useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth, { useFirebaseStorage } from "../hooks"
import ImagePreview from "./imagePreview";

export default function SignUp() {
  const { state } = useLocation();
  const { signUp, firebaseError } = useAuth();
  const { setFile, file, handleUpload, status, percent, url } 
    = useFirebaseStorage();
  const navigate = useNavigate();
  const [email, setEmail] = useState(state?.email || "");
  const [password, setPassword] = useState(state?.password || "");
  const [name, setName] = useState("");

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (url !== "") {
      await signUp({ email, password, url });
      navigate("/");
    }
  }, [email, password, url]);

  const suggestUsername = useCallback((e) => {
    e.preventDefault();
    if (email) {
      setName(email.split("@").join("-"));
    }
  }, [email]);

  return (
    <div>
      {firebaseError}
      <form onSubmit={onSubmit}>
        <span>Sign Up</span>
        <div>
          <span>Username: </span>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button onClick={suggestUsername}>Suggest</button>
        </div>
        <div>
          <span>Email: </span>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <span>Password: </span>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <span>Picture: </span>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="/image/*"
          />
          <div>
            {file && <ImagePreview file={file} />}
          </div>
          <div>
            <button disabled={!file || (status === "LOADING") || (status === "SUCCESS")} onClick={(e) => {
              e.preventDefault();
              handleUpload();
            }}>{status === "READY" ? `Save` : `${percent}% done`}</button>
          </div>
        </div>
        <div>
          <button type="submit">Sign Up</button>
          <button onClick={() => navigate("/login", {
            state: {
              email,
              password
            }
          })}>Registered already? Sign in instead</button>
        </div>
      </form>
    </div>
  )
}