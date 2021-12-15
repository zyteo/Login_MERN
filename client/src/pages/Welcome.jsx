import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { text } from "../localisation/text";

function Welcome({ language }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  return (
    <>
      <h1>{language === "en" ? text.en.welcome : language === "简体中文" ? text.simplifiedCN.welcome : text.traditionaldCN.welcome}</h1>
    </>
  );
}

export default Welcome;
