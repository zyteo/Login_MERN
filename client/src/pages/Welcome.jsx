import React, { useState } from "react";
import { text } from "../localisation/text";

function Welcome({ language, userName, name, role }) {
  const handleLink = () => {
    window.location.href = "https://google.com/";
  }

  return (
    <>
      <h1>{text[language].welcome}</h1>
      <h1>{text[language].username} {userName}</h1>
      <h1>{text[language].name} {name}</h1>
      <h1>{text[language].role} {role}</h1>
      {role === "Manager" ? <button onClick={()=>handleLink()}>{text[language].link}</button> : <></>}
    </>
  );
}

export default Welcome;