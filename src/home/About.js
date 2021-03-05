import React from "react";
import Navigation from "./navigation/Navigation";
import img from "../images/about.png";
function About() {
  return (
    <div>
      <Navigation />
      <div className="about-container">
        <div className="row">
          <div className="col-md-5">
          <p className="title-color">About</p>
          </div>
          <div className="col-md-6 home-img">
              <img src={img} atl={img} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
