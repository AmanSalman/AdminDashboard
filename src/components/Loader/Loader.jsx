import React from "react";
import "./Loader.css";
import "./Loader.sass";
function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="dot-spin"></div>
      </div>
    </div>
  );
}

export default Loader;
