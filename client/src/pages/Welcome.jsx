import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { text } from "../localisation/text";

function Welcome({ language }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  return (
    <>
      <h1>{text[language].welcome}</h1>
    </>
  );
}

export default Welcome;
