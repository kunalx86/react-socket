
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, indexedDBLocalPersistence, setPersistence, onAuthStateChanged } from "firebase/auth";
import { useCallback, useEffect, useReducer } from "react";
import { auth } from "../firebase";
import { LOGIN, LOGIN_FIREBASE_ERROR, LOGIN_LOADING, LOGIN_SERVER_ERROR, LOGOUT, SIGNUP_FIREBASE_ERROR, SIGNUP_LOADING } from "./actionTypes";
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
    // Register auth listener
    let unsubscribe = () => {};
    const authStateChangeAndSetPersistence = async () => {
      await setPersistence(auth, indexedDBLocalPersistence);
      unsubscribe = onAuthStateChanged(auth, async user_ => {
        // console.log(user_);
        if (!user_) {
          dispatch({ type: LOGOUT });
          return;
        }
        try {
          // Make a request to server to get data from the server
          const token = await user_.getIdToken();
          
          dispatch({
            type: LOGIN,
            payload: user_
          })
          // console.log(token)
        } catch (e) {
          dispatch({
            type: LOGIN_SERVER_ERROR,
            payload: e?.message
          })
        }
      }, err => {
        dispatch({
          type: LOGIN_FIREBASE_ERROR,
          payload: err?.message
        })
      }); 
    }
    authStateChangeAndSetPersistence();
    return unsubscribe;
  }, []);

  const login = useCallback(async ({ email, password }) => {
    dispatch({
      type: LOGIN_LOADING
    });
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      dispatch({
        type: LOGIN_FIREBASE_ERROR,
        payload: err?.message
      })
    }
  }, []);

  const signUp = useCallback(async ({ email, password }) => {
    dispatch({
      type: SIGNUP_LOADING
    });
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
      dispatch({
        type: SIGNUP_FIREBASE_ERROR,
        payload: err?.message
      })
    }
  }, []);

  const logout = useCallback(async () => {
    await auth.signOut();
    dispatch({
      type: LOGOUT
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
      signUp
    }}>
      {isLoading ? <div>Auth State loading...</div> : children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;