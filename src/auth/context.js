import { createContext } from "react";

/*
* Fields:
* user? => Represents the user from backend (not firebase)
* isLoading => Loading state
* isLoggedIn => Boolean to represent if logged in
* firebaseError => Error from firebase
* error => Error from our backend
* login => Function to login, send email, pwd (as of now)
* signup => Function to singup, send email, pwd(as of now)
* logout => Function to logout
*/
const defaultValue = {
  user: null,
  isLoading: true,
  isLoggedIn: false,
  firebaseError: "",
  error: "",
  login: async () => {},
  signUp: async () => {},
  logout: async () => {},
  forgotPassword: async () => {}
};

const AuthContext = createContext(defaultValue);

export default AuthContext;