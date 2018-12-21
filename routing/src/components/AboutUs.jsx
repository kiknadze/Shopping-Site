import React, { Component } from "react";
import PerMember from "./PerMember";

class AboutUs extends Component {
  render() {
    return (
      <div className="aboutus--container--wrapper">
        <div className="aboutus--heading">
          <h1>Wanna meet our team?</h1>
        </div>
        <div className="aboutus--container">
          <PerMember
            imgbanner={"https://source.unsplash.com/w8YICpz1I10/358x458"}
            img={"https://source.unsplash.com/user/erondu/160x90"}
            heading={"Temo"}
            fullName={"Temo Kiknadze"}
            intro={"Hi, finances is smth I am mad about!"}
            fullinfo={
              "I am 25 years old and since childhood, I have been interested in math, especially in Geometry"
            }
            jobTitle={"Accountant"}
            facebook={"https://www.facebook.com/kiknadzetemo"}
            instagram={"https://www.facebook.com/kiknadzetemo"}
          />
          <PerMember
            imgbanner={"https://source.unsplash.com/w8YICpz1I10/358x458"}
            img={"https://source.unsplash.com/user/erondu/160x90"}
            heading={"Dea"}
            fullName={"Dea Samniashvili"}
            intro={"Hi, Coffee makes my life!"}
            fullinfo={
              "Honestly, I can drink coffee for dozen times a day. That's why I chose this profession. I am the producer and I am the customer!"
            }
            jobTitle={"Coffee Maker"}
            facebook={"https://www.facebook.com/samniashvili.dea"}
            instagram={"https://www.instagram.com/__dsamniashvili/"}
          />

          <PerMember
            imgbanner={"https://source.unsplash.com/w8YICpz1I10/358x458"}
            img={"https://source.unsplash.com/user/erondu/160x90"}
            heading={"Mariami"}
            fullName={"Mariam Sahamatava"}
            intro={"Hi, I fly all the time!"}
            fullinfo={
              "I love birds and I love the sky. That's why I decided to spend half of my time close to the things that I love!"
            }
            jobTitle={"Steward"}
            facebook={"https://www.facebook.com/mariam.shamatava"}
            instagram={"https://www.facebook.com/mariam.shamatava"}
          />
          <PerMember
            imgbanner={"https://source.unsplash.com/w8YICpz1I10/358x458"}
            img={"https://source.unsplash.com/user/erondu/160x90"}
            heading={"Salome"}
            fullName={"Salome Babukhadze"}
            intro={"Hi, Speaking is strong part of mine!"}
            fullinfo={
              "I love to speak and I can speak for the whole day. I love my job so much that sometimes I work overtime!"
            }
            jobTitle={"Operator"}
            facebook={"https://www.facebook.com/Salomebbb"}
            instagram={"https://www.instagram.com/fathousecatt/"}
          />
        </div>
      </div>
    );
  }
}

export default AboutUs;
