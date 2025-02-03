import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Subscribe from "./components/Subscribe";
import Notifications from "./components/Notifications";
import Login from "./components/Login";
// import "./styles.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/subscribe" element={<Subscribe />} />
        {/* <Route path="/unsubscribe" element={<ubscribe />} /> */}
        <Route path="/signup" element={<Login />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </Router>
  );
}

export default App;
