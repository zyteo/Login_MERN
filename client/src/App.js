import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import SignUp from "./pages/Signup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  const [auth, setAuth] = useState("NoAuth");
  const [role, setRole] = useState("User");
  const [userName, setUsername] = useState("");
  const navigate = useNavigate();
  // handle function for logging out, passed as props to navbar
  const handleLogOut = async (event) => {
    await axios.delete(`/api/login`);
    setAuth("NoAuth");
    setRole("Guest");
    setUsername("");
    navigate(`/`);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Login
              setAuth={setAuth}
              setRole={setRole}
              setUsername={setUsername}
            />
          }
        />

        <Route path="/signup" element={<SignUp />} />

        {/* <Route path="/cats/:id"element={auth === "Auth" ? (
              <AuthCatShow userName={userName} role={role} />
            ) : (
              <CatShow />
            )}/> */}
      </Routes>
    </div>
  );
}

export default App;
