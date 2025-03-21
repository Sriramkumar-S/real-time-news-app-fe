import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Subscribe from "./components/Subscribe";
import Notifications from "./components/Notifications";
import Login from "./components/Login";
import LikedArticles from "./components/LikedArticles";
import HomePage_1 from "./components/HomePage_1";
// import "./styles.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<HomePage_1 />} />
        <Route path="/subscribe" element={<Subscribe />} />
        {/* <Route path="/unsubscribe" element={<ubscribe />} /> */}
        <Route path="/signup" element={<Login />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/likedArticles" element={<LikedArticles />} />
      </Routes>
    </Router>
  );
}

export default App;
