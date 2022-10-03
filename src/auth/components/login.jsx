import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks"

export default function Login() {
  const { state } = useLocation();
  const { login, firebaseError } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(state?.email || "");
  const [password, setPassword] = useState(state?.password || "");
  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    await login({ email, password });
    navigate("/")
  }, [email, password]);

  return (
    <div>
      {firebaseError}
      <span>Log In</span>
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
          <span>Password: </span>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <button type="submit">Login</button>
          <button onClick={() => navigate("/signup", {
            state: {
              email,
              password
            }
          })}>Not registered? Sign up instead</button>
          <button onClick={() => navigate("/forgot-password", {
            state: {
              email,
            }
          })}>Forgor Password 💀</button>
        </div>
      </form>
      <PhoneLogin />
    </div>
  )
}

function PhoneLogin() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const {} = useAuth()
  const onSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <form onSubmit={onSubmit}>
      <div>
        <span>Phone Number</span>
        <input type="text" value={phone} onChange={e => setPhone(e.target.value)}/>
        <button onClick={e => {

        }}>Submit Phone</button>
      </div>
      <div>
        <span>OTP</span>
        <input type="text" value={otp} onChange={e => setOtp(e.target.value)}/>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}