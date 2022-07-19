import { useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks"

export default function SignUp() {
  const { state } = useLocation();
  const { signUp, firebaseError } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(state?.email || "");
  const [password, setPassword] = useState(state?.password || "");
  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    await signUp({ email, password });
    navigate("/");
  }, [email, password]);

  return (
    <div>
      {firebaseError}
      <form onSubmit={onSubmit}>
        <span>Sign Up</span>
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