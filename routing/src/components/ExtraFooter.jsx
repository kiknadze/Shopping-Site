//simple component, for informative and decorational purposes only.
//added some animations in css

import React from "react";

export default function ExtraFooterD() {
  return (
    <div className="extrafooter--wrapper">
      <div className="extrafooter--part">
        <i className="fas fa-truck" />
        <h4>Free delivery over ₾300</h4>
      </div>
      <div className="extrafooter--part">
        <i className="fab fa-btc" />
        <h4>Pay with BTC</h4>
      </div>
      <div className="extrafooter--part">
        <i className="fas fa-gift" />
        <h4>Gift Cards</h4>
      </div>
      <div className="extrafooter--part">
        <i className="fas fa-hand-holding-usd" />
        <h4>5 Days refund/return </h4>
      </div>
    </div>
  );
}
