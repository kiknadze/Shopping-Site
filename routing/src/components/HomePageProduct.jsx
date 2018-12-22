// import React, { Component } from "react";
// import data from "../db/products.json";

// class HomePageProduct extends Component {
//   constructor(props) {
//       super(props)

//       this.state={
//         data
//       }
//   }

//   render() {
//     return (
//       <div className="right-side">
//       <div className="gallery-container">
//       <div className="first-grid">

//         {
//           this.state.data.map((value) =>
//           <div className="single-item">
//                 <div className="ProductImage">
//                   <img src={value.url} alt="" />
//                 </div>
//                 <div className="ProductInfo">
//                   <p>{value.name}</p>
//                   <h2>price: {value.price}</h2>
//                 </div>
//             </div>
//           )
//         }
//        </div>

//         </div>
//         </div>

//     );
//   }

// }

// export default HomePageProduct;

import React, { Component } from "react";
import data from "../db/products.json";

class HomePageProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data
    };

    this.availableGrids = [];
  }

  componentDidMount() {
    this.dataLength();
  }

  // Sort products by id descending
  // this.state.data.sort((a, b) => {
  //   return b.id - a.id;
  // });

  // get current array length

  // if an array has more then 9 element trim it    /ანუ  აქ  მინდა რომ  json ფაილიდან  წამოიღოს  ბოლო  9 პროდუქტის მონაცემი
  dataLength = () => {
    let dataLength = this.state.data.length;
    if (dataLength > 9) {
      let lastNine = this.state.data.slice(dataLength - 9);
      this.setState({
        data: lastNine
      });

      lastNine.map((val, key) => {
        if (key % 3 == 0) {
          this.availableGrids.push(key);
        }
      });

      console.log("grid:", this.availableGrids);
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
          {this.availableGrids.map((value, iKey) => (
            <div key={iKey}  className={"a"+iKey} >       
        
              {this.retreiveItems(value).map((item, iItem) => (
               
                <div key={iItem} className="single-item">
                 <div className="gray-bg">
             
                    <div className="ProductImage">
                      <img src={item.url} alt="" />
                    </div>
                    <div className="ProductInfo">
                      <p>{item.name}</p>
                      <h2>price: {item.price}</h2>
                    </div>
                  </div>
               </div>
              ))}
            </div>
          ))}
        </div>
        {/* <div className="gallery-container">
          {this.state.data.map((value, index) => (
            <div key={index} className="single-item">
              <div className="gray-bg">
                <div className="ProductImage">
                  <img src={value.url} alt="" />
                </div>
                <div className="ProductInfo">
                  <p>{value.name}</p>
                  <h2>price: {value.price}</h2>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    );
  }
}

export default HomePageProduct;
