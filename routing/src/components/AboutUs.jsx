// import React, { Component } from "react";

// class AboutUs extends Component {
//   render() {
//     return (
//       <div className="right-side">
//         <div className="aboutUs-container">
//           <div className="aboutUs-item">
//             <div className="aboutUs-image">
//               <img className="img1"
//                 alt="NO"
//                 src="https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
//               />
//             </div>
//             <div className="aboutUs-info">
//               <p>
//                 {" "}
//                About Company
//               </p>
//             </div>
//           </div>

//           <div className="aboutUs-item">
//             <div className="aboutUs-image">
//               <img className="img2"
//                 alt="NO"
//                 src="https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
//               />
//             </div>
//             <div className="aboutUs-info">
//               <p>
//                 {" "}
//                 aboaboutUs-info
//               </p>
//             </div>
//           </div>

//           <div className="aboutUs-item">
//             <div className="aboutUs-image">
//               <img className="img3"
//                 alt="NO"
//                 src="https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
//               />
//             </div>
//             <div className="aboutUs-info">
//               <p>
//                 {" "}
//                 aboutaboutUs-info"
//               </p>
//             </div>
//           </div>

//           <div className="aboutUs-item">
//             <div className="aboutUs-image">
//               <img className="img4"
//                 alt="NO"
//                 src="https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
//               />
//             </div>
//             <div className="aboutUs-info">
//               <p>
//                 {" "}
//                 abouaboutUs-info
//               </p>
//             </div>
//           </div>

//           <div className="aboutUs-item">
//             <div className="aboutUs-image">
//               <img className="img5"
//                 alt="NO"
//                 src="https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
//               />
//             </div>
//             <div className="aboutUs-info">
//               <p>
//                 {" "}
//                 aboutUaboutUs-info
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default AboutUs;

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
