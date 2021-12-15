import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Welcome() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

 
  return (
    <>
      <h1>Welcome!</h1>
      
    </>
  );
}

export default Welcome;
