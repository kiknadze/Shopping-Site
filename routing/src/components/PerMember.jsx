import React from "react";

export default function PerMember(props) {
  return (
    <div className="member--wrapper">
      <div className="member--wrapper--container">
        <div className="image--half">
          <img
            src={props.imgbanner}
            className="banner--image"
            alt="member-banner"
          />
        </div>
        <div className="image--person">
          <img src={props.img} alt="member" />
        </div>
        <div className="person--name">
          <h1>{props.heading}</h1>
          <p>{props.jobTitle}</p>
        </div>
        <div className="detailed--info">
          <div className="detailed--info--wrapper">
            <h4>{props.fullName}</h4>
            <h5>{props.intro}</h5>
            <p>{props.fullinfo}</p>
            <div className="socials">
              <h5>Find me on: </h5>
              <a
                href={props.facebook}
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                href={props.instagram}
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
