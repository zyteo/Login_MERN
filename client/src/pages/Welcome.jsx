import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { text } from "../localisation/text";
import jwt_decode from "jwt-decode";

function Welcome({ language, auth }) {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState("");

  // only authenticated users can access welcome page
  useEffect(()=> {
    let token = localStorage.getItem("token");
    if (auth !== "Auth" || (!token)){
      navigate("/");
    }
    else if (token){
      let tokenInfo = jwt_decode(token);
      setUserDetails(tokenInfo);
    }
  },[])

  
  const handleLink = () => {
    window.location.href = "https://google.com/";
  };

  return (
    <>
      <h1>{text[language].welcome}</h1>
      <h1>
        {text[language].username} {userDetails?.username}
      </h1>
      <h1>
        {text[language].name} {userDetails?.name}
      </h1>
      <h1>
        {text[language].role} {userDetails?.role}
      </h1>
      {userDetails?.role === "Manager" ? (
        <button onClick={() => handleLink()}>{text[language].link}</button>
      ) : (
        <></>
      )}
    </>
  );
}

export default Welcome;
