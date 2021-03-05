import React from "react";
import Navigation from "./navigation/Navigation";
import img from '../images/header_image.png';
function Home() {
  return (
    <div>
      
      <div className="header">
      <Navigation />
            <div className="row">
                <div className="col-md-5 title-container">
                        <p className="title-color">TaboGarahe</p>
                        <p className="moto-color">"Your one stop garage shop on the cloud"</p>
                </div>
                <div className="col-md-6 home-img">
                        <img src={img} alt={img} />
                </div>
            </div>
      </div>
    </div>
  );
}

export default Home;
