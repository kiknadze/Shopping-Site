import React, { Component } from "react";
import { Carousel } from "antd";

class Slider extends Component {
  render() {
    return (
      <div>
        <Carousel effect="scrollx" autoplay>
          <div className="single-slide">
            <div className="info">description</div>
            <div className="image">
              <img
                src="https://images.pexels.com/photos/1248583/pexels-photo-1248583.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                alt="#"
              />
            </div>
          </div>
          <div className="single-slide">
            <div className="info">description</div>
            <div className="image">
              <img
                src="https://images.pexels.com/photos/931887/pexels-photo-931887.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                alt="#"
              />
            </div>
          </div>
          <div className="single-slide">
            <div className="info">description</div>
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