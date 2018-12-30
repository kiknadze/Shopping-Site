import React, { Component } from "react";
import { Carousel } from "antd";

class Slider extends Component {
  render() {
    return (
      <div className="main__slider">
        <Carousel effect="scrollx" autoplay>
          <div className="single-slide">
            <div className="info">
              <span>All People Look Charming When They're Thinking</span>
            </div>
            <div className="image">
              <img src="imgs/members/temoforslider.jpg" alt="NO TEMO" />
            </div>
          </div>
          <div className="single-slide">
            <div className="info">
              <span>
                Very cozy and comfortable outdoor furniture.
                <h6>
                  <br />
                  P.S. When you do not know they are taking picture of you
                </h6>
              </span>
            </div>
            <div className="image">
              <img src="imgs/members/homesalome.png" alt="NO SALOME" />
            </div>
          </div>
          <div className="single-slide">
            <div className="info">
              <span>We will help you, choose your fav. "STENKA"!!!</span>
            </div>
            <div className="image">
              <img src="imgs/members/stenka.jpg" alt="NO DEA" /> alt="#"
            </div>
          </div>
          <div className="single-slide">
            <div className="info">
              <span>Softness makes you happy</span>
            </div>
            <div className="image">
              <img
                src="imgs/members/homemariam.jpeg"
                alt="#"
              />
            </div>
          </div>
        </Carousel>
      </div>
    );
  }
}

export default Slider;
