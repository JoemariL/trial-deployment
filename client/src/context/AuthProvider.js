import { createContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({});

let access;
try {
  const cookie = Cookies.get("accessToken") ? Cookies.get("accessToken") : null;
  access = cookie;
} catch (error) {
  access = null;
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ access });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
