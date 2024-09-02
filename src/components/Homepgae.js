import React from "react";
import { useNavigate } from "react-router-dom";

const Homepgae = () => {
  const navigate = useNavigate();

  const handlePageLoad = () => {
    navigate(`/clothespage`);
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <p className="home-heading">
          <strong>
            Elevate Your Shopping Experience <br /> Premium Products,
            Exceptional Quality
          </strong>
        </p>
        <button className="shop-now-btn" onClick={handlePageLoad}>
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Homepgae;
