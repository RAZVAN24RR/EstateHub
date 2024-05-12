import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./Pages/AuthPages/Login";
import Register from "./Pages/AuthPages/Register";
import Home from "./Pages/Home";
import PresPage from "./Pages/PresPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PresPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Home/:token" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
