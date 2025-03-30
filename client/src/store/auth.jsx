import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const authorizationToken = `Bearer ${token}`;
  //function to stored the token in local storage
  const storeTokenInLS = (serverToken, userData) => {
    setUser(userData);
    setToken(serverToken);
    userAuthentication();
    return localStorage.setItem("token", serverToken);
  };

  //   this is the get the value in either true or false in the original state of token
  let isLoggedIn = !!token;
  //console.log("token", token);
  console.log("isLoggedIN ", isLoggedIn);

  //   to check whether is loggedIn or not
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  // JWT AUTHENTICATION
  

 const userAuthentication = async () =>{
  try {
    setIsLoading(true);
    const response = await fetch(`http://localhost:5000/api/auth/user`, {
      method: "GET",
      headers: {  
        Authorization: authorizationToken,
            },
    });
    if(response.ok){
      const data = await response.json();
      console.log('user data', data.userData);
      setUser(data.userData);
      //setIsLoading(false);
    } else {
      console.error("Error fetching user data:", response.status, response.statusText);
      
      //setIsLoading(false);
    }
  } catch (error) {
    console.error("error fetching user data:", error.message);
  } finally {
    setIsLoading(false);
  }
 };

 // to fetch the data services from the database
 const getServices = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/data/service`,{
      method:"GET",
    });

    if(response.ok){
      const data = await response.json();
      console.log(data.msg);
      setServices(data.msg);
    } else{
      console.error("Error fetching services:", response.status, response.statusText);
    }
  } catch (error) {
    console.error(`services frontend error: ${error.message}`);
  }
 };


useEffect(() =>{
  getServices();
  userAuthentication();
},[]);




  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user,  services, authorizationToken, isLoading,}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
