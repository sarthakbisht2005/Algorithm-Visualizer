import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  return (
    <nav style={{
      background: "#0056d2",
      color: "#fff",
      padding: "12px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontFamily: "sans-serif",
      boxShadow: "0 2px 8px #e0e0e0"
    }}>
      <div style={{ fontWeight: 700, fontSize: 20 }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          Algorithm Visualizer
        </Link>
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        <Link to="/" style={{
          color: location.pathname === "/" ? "#f7d51d" : "#fff",
          textDecoration: "none",
          fontWeight: 500
        }}>Home</Link>
        <Link to="/about" style={{
          color: location.pathname === "/about" ? "#f7d51d" : "#fff",
          textDecoration: "none",
          fontWeight: 500
        }}>About Us</Link>
        <Link to="https://github.com/sarthakbisht2005/Algorithm-Visualizer" style={{
          color: location.pathname === "https://github.com/sarthakbisht2005/Algorithm-Visualizer" ? "#f7d51d" : "#fff",
          textDecoration: "none",
          fontWeight: 500
        }}>Github</Link>
      </div>
    </nav>
  );
}

export default Navbar;
