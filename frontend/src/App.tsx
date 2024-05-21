import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./Pages/AuthPages/Login";
import Register from "./Pages/AuthPages/Register";
import Home from "./Pages/Home";
import PresPage from "./Pages/PresPage";
import Account from "./Pages/Account";
import About from "./Pages/About";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import AddAd from "./Pages/AddAd";
import AddDetail from "./Pages/AddDetail";
import AddAdmin from "./Pages/AddAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PresPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Home/:token" element={<Home />} />
        <Route path="/Account/:token" element={<Account />} />
        <Route path="/About" element={<About />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/AddAd/:token" element={<AddAd />} />
        <Route path="/AddDetail/:id/:token" element={<AddDetail />} />
        <Route path="/AddAdmin/:token" element={<AddAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
