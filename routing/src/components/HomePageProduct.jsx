import React, { Component } from "react";
import data from "../db/products.json";


class HomePageProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data
    };
  render() {
    return (
      <div className="gallery-container">
        <div className="frist-grid">
          <div className="single-item">
            {this.state.data.map(value => (
              <div className="single-item">
                <div className="image">
                  <img alt="No" src={value.url} />
                </div>
                <div className="info">
                  <p>{value.name}</p>
                  <h2>{"price: " + value.price + "$"}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="second-grid">
          <div className="single-item">
            {this.state.data.map(value => (
              <div className="single-item">
                <div className="image">
                  <img alt="No" src={value.url} />
                </div>
                <div className="info">
                  <p>{value.name}</p>
                  <h2>{"price: " + value.price + "$"}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="third-grid">
          <div className="single-item">
            {this.state.data.map(value => (
              <div className="single-item">
                <div className="image">
                  <img alt="No" src={value.url} />
                </div>
                <div className="info">
                  <p>{value.name}</p>
                  <h2>{"price: " + value.price + "$"}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default HomePageProduct;
