import React from 'react';
import SocialDropdown from './SocialDropdown';
import Subscribe from './Subscribe';

function DonationButton({click}){
    return(
      <div className="donationButtonSection">
        <div className="donationButton" onClick={click}>
          <p className="donationText">Step Up Now &gt;</p>
        </div>
      </div>
    );
  }
  

function Background(){
    return (
        <div className="homepageImageContainer">
            <div className="mainBackground hpSize s1height">
                <img src={process.env.PUBLIC_URL + '/images/background.jpeg'} alt="background" className = "bgImage s1height"/>
            </div>
            <div className = "mainBackground hpSize s1height darken" />
      </div>
    );
}

function Overlay({modal}){
  return(
    <div className = 'overlayContainer'>
      <div className ="overlay o1">
        <p>Changing the world one step at a time.</p>
      </div>
      <p className="overlay o2">Welcome to the One Dollar Foundation.</p>
      <DonationButton click = {modal}/>
    </div>
);
}

export default function HomepageImage({modal, expanded}){
    return (
      <div className = 'homepageContainer s1height'>
        <Background />
        <div className = {window.innerWidth > 1200 ? "hp s1height desktopHomepage" : "hp s1height mobileHomepage flex"}>
          <Overlay modal = {modal} />
          {window.innerWidth > 1200 && <Subscribe />}
        </div>
        <SocialDropdown dropdown = {expanded} />
      </div>
    );
  }