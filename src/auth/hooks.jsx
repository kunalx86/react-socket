import { useContext } from "react";
import AuthContext from "./context";

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Auth Context should be used within Auth Provider")
  return context;
}

export default useAuth;