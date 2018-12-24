import React, { Component } from "react";
import Users from '../db/users.json'; //get users DB

const reviewsUrl = "http://localhost:5000/db/review";

export default class Review extends Component {
  constructor(props) {
    super(props);

    this.review = React.createRef();

    this.state = {
      userID: props.userID,
      productID: props.productID,
      reviews: [],
      reviewText: ""
    };
  }

  componentDidMount() {
    this.getReview(this.state.productID);
  }

  //Get data from review DB
  getReview = productID => {
    fetch(reviewsUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ productID })
    })
      .then(res => res.json())
      .then(reviews => {
        this.setState({ reviews });
      })
      .catch(err => console.log(err));
  };

  //Add new review to state
  reviewSubmit = e => {
    e.preventDefault();
    this.addReview(
      this.state.productID,
      this.state.userID,
      this.review.current.value
    );
    this.setState({
      reviewText: ""
    });
  };

  //change input value
  changeHandler = e => {
    this.setState({
      reviewText: e.target.value
    });
  };
  //add review to db and renew state
  addReview(productID, userID, message) {
    fetch("http://localhost:5000/product/review/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ productID, userID, message })
    })
      .then(res => res.json())
      .then(reviews => {
        this.setState({ reviews });
      })
      .catch(err => console.log(err));
  }

  getUserName = (userID) => {
    return Users.find(user => user.id === userID).username
  };

  render() {
    return (
      <div className="review--container">
        <div className="review--container--inside">
          <h4 className="review-heading">Reviews about this product:</h4>
          {this.state.reviews.map((review, index) => (
            <div className="review--wrapper" key={index}>
              <div className="review-header">
                <i className="fas fa-user" />
                <span>{this.getUserName(review.userID)}</span>
              </div>
              <div className="review-body">
                <p className="review-text">
                  <i className="fas fa-pen" />
                  <span>{review.message}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={this.reviewSubmit}>
          <div className="form-group">
            <label htmlFor="desc">Write a Review</label>
            <textarea
              className="form-control"
              id="review"
              name="review"
              rows="3"
              value={this.state.reviewText}
              onChange={this.changeHandler}
              placeholder="Share your experience with others..."
              ref={this.review}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Add a Review
          </button>
        </form>
      </div>
    );
  }
}
