import React, { Component } from "react";
import { Link } from "react-router-dom";
import data from "../db/products.json";

class HomePageProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data,
      availableGrids: []
    };
  }

  componentDidMount() {
    this.dataLength();
  }

  dataLength = () => {
    let dataLength = this.state.data.length;
    if (dataLength > 9) {
      let lastNine = this.state.data.slice(dataLength - 9);
      this.setState({
        data: lastNine
      });
      let availableGrids = [];
      lastNine.map((val, key) => {
        if (key % 3 === 0) {
          availableGrids.push(key);
        }
        return availableGrids;
      });
      this.setState({ availableGrids });
    }
  };

  retreiveItems = startKey => {
    let itemsToReturn = [];
    for (let i = startKey; i < startKey + 3; i++) {
      itemsToReturn.push(this.state.data[i]);
    }
    return itemsToReturn;
  };

  render() {
    return (
      <div className="right-side">
        <div className="gallery-container">
          {this.state.availableGrids.map((value, iKey) => (
            <div key={iKey} className={"a" + iKey}>
              {this.retreiveItems(value).map((item, iItem) => (
                <div key={iItem} className="single-item">
                  <div className="gray-bg">
                    <Link to={`/products/${item.id}`}>
                      <div className="ProductImage">
                        <img src={item.url} alt="" />
                      </div>
                      <div className="ProductInfo">
                        <p>price: {item.price} ₾</p>
                        <h3>{item.name}</h3>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default HomePageProduct;
