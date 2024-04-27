import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [username, setUsername] = useState(localStorage.getItem("user") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res);
      if (res.data) {
        setUser(res.data);
        setUsername(res.data.username)
        console.log(res.data.username);
        console.log(res.data);
        console.log(res.token.access_token);
        setToken(res.token.access_token);

        localStorage.setItem("site", res.token.access_token);
        localStorage.setItem("user", res.data.username);
        //const username = localStorage.getItem('user');
        //const user = username?.username;
        //console.log(user);
        navigate("/HOME");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const registerAction = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res);
      if (res.data) {
      
        console.log('user Added');
        navigate("/login");
        return;
      }
      throw new Error(res.message);
      
    } catch (err) {
      console.error(err);

    }
  };

  return  <AuthContext.Provider value={{ token, user, loginAction, logOut, registerAction }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};