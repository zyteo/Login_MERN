import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { text } from "../localisation/text";

function Welcome({ language, userName, name, role, auth }) {
  const navigate = useNavigate();

  // only authenticated users can access welcome page
  useEffect(()=> {
    if (auth !== "Auth"){
      navigate("/");
    }
  },[])

  
  const handleLink = () => {
    window.location.href = "https://google.com/";
  };

  return (
    <>
      <h1>{text[language].welcome}</h1>
      <h1>
        {text[language].username} {userName}
      </h1>
      <h1>
        {text[language].name} {name}
      </h1>
      <h1>
        {text[language].role} {role}
      </h1>
      {role === "Manager" ? (
        <button onClick={() => handleLink()}>{text[language].link}</button>
      ) : (
        <></>
      )}
    </>
  );
}

export default Welcome;
