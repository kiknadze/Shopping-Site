import React, { Component } from "react";
import PerMember from "./PerMember";

//Using PerMember Component, setting each member's module with props
//And unite in Aboutus component

class AboutUs extends Component {
  render() {
    return (
      <div className="aboutus--container--wrapper">
        <div className="aboutus--heading">
          <h1>Wanna meet our team?</h1>
        </div>
        <div className="aboutus--container">
          <PerMember
            imgbanner={
              "https://files.theinteriorsaddict.com/uploads/2014/10/Screen-Shot-2014-10-19-at-12.59.05-pm.png"
            }
            img={"imgs//members/temo.jpg"}
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
            imgbanner={
              "https://i.pinimg.com/564x/c0/6c/e5/c06ce5b6f6227962be6b150d78fc27f4.jpg"
            }
            img={"imgs/members/dea.jpg"}
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
            imgbanner={
              "https://i.pinimg.com/564x/d4/5c/68/d45c687fe9341b3df29142c6e97d6fed.jpg"
            }
            img={"imgs//members/mariami.jpg"}
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
            imgbanner={
              "https://i1.wp.com/homegardenmagz.com/wp-content/uploads/2018/05/Modern-Minimalist-DIY-Room-Decor-Ideas8.jpg?resize=973%2C1460&ssl=1"
            }
            img={"imgs/members/salome.jpg"}
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
