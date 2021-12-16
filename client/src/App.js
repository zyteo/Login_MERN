import "./App.css";
import axios from "axios";
import React, { useContext, useState } from "react";
import SignUp from "./pages/Signup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import NavBar from "./pages/NavBar";
import { text } from "./localisation/text";

function App() {
  const [auth, setAuth] = useState("NoAuth");
  const [role, setRole] = useState("User");
  const [userName, setUsername] = useState("");
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("English");

  const navigate = useNavigate();
  // handle function for logging out, passed as props to navbar
  const handleLogOut = async () => {
    await axios.get(`/api/logout`);
    setAuth("NoAuth");
    setRole("User");
    setUsername("");
    localStorage.removeItem("token");
    navigate(`/`);
  };

  return (
    <div className="App">
      <NavBar
        auth={auth}
        handleLogOut={handleLogOut}
        userName={userName}
        setLanguage={setLanguage}
        language={language}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Login
              setName={setName}
              setAuth={setAuth}
              setRole={setRole}
              setUsername={setUsername}
              language={language}
            />
          }
        />

        <Route path="/signup" element={<SignUp language={language} />} />
        <Route
          path="/welcome"
          element={
            <Welcome
              language={language}
              userName={userName}
              name={name}
              role={role}
              auth={auth}
            />
          }
        />

      </Routes>
    </div>
  );
}

export default App;
