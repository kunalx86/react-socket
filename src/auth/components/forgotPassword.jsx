import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks"

export default function Login() {
  const { state } = useLocation();
  const { firebaseError, forgotPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(state?.email || "");
  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    // navigate("/")
  }, [email]);

  return (
    <div>
      {firebaseError}
      <span>Forgot Password</span>
      <form onSubmit={onSubmit}>
        <div>
         <span>Email: </span>
         <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        </div>
        <div>
          <button type="submit">Send Email</button>
          <button onClick={() => navigate("/login", {
            state: {
              email,
            }
          })}>Remember Password 😁? Login instead</button>
        </div>
      </form>
    </div>
  )
}