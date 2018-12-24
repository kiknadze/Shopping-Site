import React, { Component } from "react";
import ScrollToTop from "react-scroll-up";

// Using the library, create Back to top button with the info text on hover

export default class BackToTop extends Component {
  render() {
    return (
      <div>
        <ScrollToTop showUnder={200}>
          <div className="back-to-top">
            <i className="fas fa-angle-double-up" />
            <span className="tooltiptext">Back To Top!</span>
          </div>
        </ScrollToTop>
      </div>
    );
  }
}
