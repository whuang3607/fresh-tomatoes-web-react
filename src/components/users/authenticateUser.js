import React, { createContext, useContext, useState } from "react";
import * as client from "./client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const signin = async (credentials) => {
    try{
        const user = await client.signin(credentials);
        setCurrentUser(user);
        console.log(user)
        return user;
    } catch(error) {
        throw error;
    }
    
  };

  const signout = async () => {
    await client.signout();
    setCurrentUser(null);
  };


  return (
    <AuthContext.Provider value={{ currentUser, signin, signout, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
