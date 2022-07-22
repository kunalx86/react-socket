import { axiosClient } from "../axios";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { useCallback, useEffect, useReducer } from "react";
import { auth } from "../firebase";
import { FORGOT_PASSWORD, FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_LOADING, LOGIN, LOGIN_FIREBASE_ERROR, LOGIN_LOADING, LOGIN_SERVER_ERROR, LOGOUT, SIGNUP_FIREBASE_ERROR, SIGNUP_LOADING, SIGNUP_SERVER_ERROR } from "./actionTypes";
import AuthContext from "./context";
import authReducer from "./reducer";

export function AuthProvider({ children }) {
  const [{
    user,
    isLoading,
    isLoggedIn,
    firebaseError,
    error
  }, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: true,
    isLoggedIn: false,
    firebaseError: "",
    error: ""
  })

  useEffect(() => {
    const me = async () => {
      dispatch({
        type: LOGIN_LOADING
      });
      try {
        const { data } = await axiosClient.get("/client/me");
        dispatch({
          type: LOGIN,
          payload: data
        });
      } catch (e) {
        dispatch({
          type: LOGOUT
        });
      }
    }

    me();

    // Register auth listener
    const unsubscribe = onAuthStateChanged(auth, async user_ => {
      if (!user_) return;

      try {
        // Make a request to server to get data from the server
        const token = await user_.getIdToken();
        localStorage.setItem("session", token);
        const { data: { data } } = await axiosClient.post("/client/login", {});
        dispatch({
          type: LOGIN,
          payload: data
        })
      } catch (e) {
        if (e instanceof FirebaseError) {
          dispatch({
            type: LOGIN_FIREBASE_ERROR,
            payload: e?.message
          })
        } else {
          dispatch({
            type: LOGIN_SERVER_ERROR,
            payload: e?.message
          })
        }
      }
    }, err => {
      dispatch({
        type: LOGIN_FIREBASE_ERROR,
        payload: err?.message
      })
    });

    return unsubscribe;
  }, []);

  const login = useCallback(async ({ email, password }) => {
    dispatch({
      type: LOGIN_LOADING
    });
    try {
      await signInWithEmailAndPassword(auth, email, password); 
    } catch (e) {
      dispatch({
        type: LOGIN_FIREBASE_ERROR,
        payload: e?.message
      })
    }
  }, []);

  const signUp = useCallback(async ({ email, password, url, name }) => {
    dispatch({
      type: SIGNUP_LOADING
    });
    try {
      const user_ = await createUserWithEmailAndPassword(auth, email, password)
      const token = await user_.user.getIdToken();
      localStorage.setItem("session", token);

      // Send other credentials to our server to save the data
      await axiosClient.post("/client/register", {
        email,
        password,
        phone: "+919145623417",
        name,
        photo: url
      });
    } catch (err) {
      if (err instanceof FirebaseError) {
        dispatch({
          type: SIGNUP_FIREBASE_ERROR,
          payload: err?.message
        })
      } else {
        dispatch({
          type: SIGNUP_SERVER_ERROR,
          payload: err?.message
        })
      }
    }
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem("session");
    await auth.signOut();
    dispatch({
      type: LOGOUT
    });
  }, []);

  const forgotPassword = useCallback(async (email) => {
    dispatch({
      type: FORGOT_PASSWORD_LOADING
    });
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (e) {
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
        payload: e?.message
      })
    }
    dispatch({
      type: FORGOT_PASSWORD
    });
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isLoggedIn,
      firebaseError,
      error,
      login,
      logout,
      signUp,
      forgotPassword
    }}>
      {isLoading ? <div>Auth State loading...</div> : children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;