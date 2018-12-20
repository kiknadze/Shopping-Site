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
  }

  componentDidMount() {
    this.dataLength()
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
      let lastNine = this.state.data.slice(dataLength - 9)
      this.setState({
        data: lastNine
      })
    }
  }



render() {
  return (


        <div className="right-side">

          <div className="gallery-container">
          
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
              
              </div>
              </div>
  );

}
}

export default HomePageProduct;