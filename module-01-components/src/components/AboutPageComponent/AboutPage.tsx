import React from 'react';
import './AboutPage.css';
import catImage from '../../assets/images/cat.jpg';

export class AboutPage extends React.Component {
  constructor(props: object) {
    super(props);
  }
  render() {
    return (
      <section className="about__wrapper">
        <h1>About Us</h1>
        <div className="about__content">
          <img className="about__image" src={catImage} alt="Cat" />
          <p className="about__description">
            Feline lovers will love their cat no matter what breed it is. However some have a
            preference over others when it comes to choosing a new kitty. There are so many breeds
            out there that it is hard to come up with what actually is the most popular cat breed
            amongst pet owners. Once you have a list of the most commonly owned breed how do you
            know for sure that it is accurate?
            <br />
            <br />
            To give an insight into people’s personal preference we have come up with the 20 most
            popular cat breeds. The information to form this list came from many different vet
            clinics and their numbers for the amount of cats that were taken in to either be adopted
            or registered. So without a further ado lets claw into which breed of feline is the most
            popular amongst pet owners.
          </p>
        </div>
      </section>
    );
  }
}
