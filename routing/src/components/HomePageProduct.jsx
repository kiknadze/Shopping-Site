import React, { Component } from "react";
import data from "../db/products.json";

class HomePageProduct extends Component {
  constructor(props) {
      super(props)

      this.state={
        data
      }
  }

  render() {
    return (
      <div className="right-side">
      <div className="gallery-container">
      <div className="first-grid">
     
        {
          this.state.data.map((value) =>
          <div className="single-item">
                <div className="ProductImage">
                  <img src={value.url} alt="" />
                </div>
                <div className="ProductInfo">
                  <p>{value.name}</p>
                  <h2>price: {value.price}</h2>
                </div>
            </div>
          )
        } 
       </div>

       <div className="second-grid">
     
        {
          this.state.data.map((value) =>
          <div className="single-item">
                <div className="ProductImage">
                  <img src={value.url} alt="" />
                </div>
                <div className="ProductInfo">
                  <p>{value.name}</p>
                  <h2>price: {value.price}</h2>
                </div>
            </div>
          )
        } 
       </div>
       <div className="third-grid">
     
     {
       this.state.data.map((value) =>
       <div className="single-item">
             <div className="ProductImage">
               <img src={value.url} alt="" />
             </div>
             <div className="ProductInfo">
               <p>{value.name}</p>
               <h2>price: {value.price}</h2>
             </div>
         </div>
       )
     } 
    </div>
        </div>
        </div>
        
    );
  }

}




export default HomePageProduct;