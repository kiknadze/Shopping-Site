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
              <span>Very cozy and comfortable outdoor furniture</span>
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
              <span>description</span>
            </div>
            <div className="image">
              <img
                src="https://images.pexels.com/photos/280471/pexels-photo-280471.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
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
