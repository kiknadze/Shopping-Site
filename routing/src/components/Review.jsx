import React, { Component } from "react";

const reviewsUrl = "http://localhost:5000/db/review";

export default class Review extends Component {
  constructor(props) {
    super(props);

    this.review = React.createRef();

    this.state = {
      userID: props.userID,
      productID: props.productID,
      reviews: []
    };
  }

  componentDidMount() {
    this.GetReview(this.state.productID);
  }

  GetReview = productID => {
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

  ReviewSubmit = e => {
    e.preventDefault();
    this.AddReview(
      this.state.productID,
      this.state.userID,
      this.review.current.value
    );
  };

  AddReview(productID, userID, message) {
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

  render() {
    return (
      <div className="review--wrapper">
        <form onSubmit={this.ReviewSubmit}>
          <div className="form-group">
            <label for="desc">Write a Review</label>
            <textarea
              className="form-control"
              id="review"
              name="review"
              placeholder="Write your review, here..."
              rows="3"
              ref={this.review}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Add Review
          </button>
        </form>
        {this.state.reviews.map(review => (
          <div className="card text-white bg-warning mb-3">
            <div className="card-header">{review.userID}</div>
            <div className="card-body">
              <p className="card-text">{review.message}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
