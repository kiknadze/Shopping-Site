
import React, { Component } from "react";
import data from "../db/products.json";

class HomePageProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data
    };
    // Sort products by id descending
    this.state.data.sort((a, b) => {
      return b.id - a.id;
    });

    // get current array length
    const dataLength = this.state.data.length;

    // if an array has more then 9 element trim it    /ანუ  აქ  მინდა რომ  json ფაილიდან  წამოიღოს  ბოლო  9 პროდუქტის მონაცემი
    if (dataLength > 9) {     
      this.state.data.splice(9);
    }


    //აქ კიდევ მინდა რომ  ახალი მასივი  შევქმნა  სადაც  იმ  წამოღებულ  9 მონაცემს  დავფუშავ 
    const availableGrids = [];   
    this.state.data.map(( key) => {
      if (key % 3 === 0) {
        availableGrids.push(key);
      }
    });
  }

  render() {
    return (
      // აქ მინდა რომ ესე  ქნას itterate through grids dynamicaly and add +3 single items inside it
      availableGrids.map((startKey) => {
        for (let i = startKey; i < startKey + 3; i++) {
          <div className="right-side">
            <div className="gallery-container">
              {/* <div className="first-grid"> */}
                {this.state.data.map(value => (
                  <div className="single-item">
                    <div className="ProductImage">
                      <img src={value.url} alt="" />
                    </div>
                    <div className="ProductInfo">
                      <p>{value.name}</p>
                      <h2>price: {value.price}</h2>
                    </div>
                  </div>
                ))}
              {/* </div> */}
            </div>
          </div>;
        }
      })
    );
  }
}

export default HomePageProduct;

