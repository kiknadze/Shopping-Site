import React, { Component } from "react";

const reviewsUrl = "http://localhost:5000/db/review";
// const usersURL = "http://localhost:5000/db/users";

export default class Review extends Component {
  constructor(props) {
    super(props);

    this.review = React.createRef();

    this.state = {
      userID: props.userID,
      productID: props.productID,
      reviews: [],
      userName: "",
      reviewText: ""
    };
    console.log(this.state);
  }

  componentDidMount() {
    this.GetReview(this.state.productID);
    this.getUserName(this.state.userID);
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
    this.setState({
      reviewText: ""
    });
  };

  changeHandler = e => {
    this.setState({
      reviewText: e.target.value
    });
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

  getUserName = () => {
    let userName = JSON.parse(localStorage.getItem("User")).username;
    console.log(userName);
    this.setState({
      userName
    });
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
                <span>{this.state.userName}</span>
              </div>
              <div className="review-body">
                <p className="review-text">
                  <i class="fas fa-pen" />
                  <span>{review.message}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={this.ReviewSubmit}>
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
