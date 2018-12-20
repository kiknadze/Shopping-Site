import React, { Component } from "react";
import { Carousel } from "antd";

function onChange(a, b, c) {
  console.log(a, b, c);
}

class AboutUsSlider extends Component {
  render() {
    return (
      <div>
        <Carousel afterChange={onChange}>
          <div className="single-slide">
            <div className="info">description</div>
            <div className="image">
              <img
                src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="#"
              />
            </div>
          </div>

          <div className="single-slide">
            <div className="info">description</div>
            <div className="image">
              <img
                src="https://as2.ftcdn.net/jpg/01/62/73/75/500_F_162737591_eBkqM3aGSQ96HI4LclA8808h1HosQnzu.jpg"
                alt="#"
              />
            </div>
          </div>

          <div className="single-slide">
            <div className="info">description</div>
            <div className="image">
              <img
                src="https://as2.ftcdn.net/jpg/01/62/73/75/500_F_162737591_eBkqM3aGSQ96HI4LclA8808h1HosQnzu.jpg"
                alt="#"
              />
            </div>
          </div>

          <div className="single-slide">
            <div className="info">description</div>
            <div className="image">
              <img
                src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="#"
              />
            </div>
          </div>
        </Carousel>
      </div>
    );
  }
}

export default AboutUsSlider;