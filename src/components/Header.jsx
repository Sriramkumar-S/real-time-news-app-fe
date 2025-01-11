import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const today = new Date().toDateString();

  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-dark text-white">
      <span>{today}</span>
      <div style={{ marginLeft: '6rem'}}>
        <h1 className="h4 mb-0">ABC News</h1>
      </div>
      <div>
        <Link to="/" className="btn btn-outline-light me-2">
          Home
        </Link>
        <Link to="/subscribe" className="btn btn-outline-light me-2">
          Subscribe
        </Link>
        <Link to="/notifications" className="btn btn-outline-light">
          Notifications
        </Link>
      </div>
    </header>
  );
}

export default Header;
