import React, {useEffect} from 'react';
import '../../css/SocialDropdown.css'

function DonationButton({click}){
    return(
      <div className="donationButtonSection">
        <div className="donationButton" onClick={click}>
          <p className="donationText">Step Up Now &gt;</p>
        </div>
      </div>
    );
  }

function Subscribe(){
    return (
        <div className = "subscribeContainer">
            <div className = "subscribe">
                <div className = "c">
                  <div className = "subscribeHeader">Subscribe to see how we use every dollar donated.</div>
                </div>
                <form>
                    <label htmlFor ="email" className = "st input label">Email:</label>
                    <input id = "email" className = "st input email" placeholder = "Enter your email here">
                        
                    </input>
                    <label htmlFor ="suggestion label">Suggestion:</label>
                    <input className = "st input suggestion" placeholder = "Please let us know of any events in your community you'd like us to be involved in">
            
                    </input>
                </form>
                <div className = "moreSubText c">
                  <p className = "st email">We will <u>only</u> email you once a month for our newsletter and expenditures report.</p>
                  <p className = "st suggestion">We will never send you email asking for money or personal information.</p>
                  <div className = "subscribeButton">Subscribe</div>
                </div>
            </div>
        </div>
    );
  }
  

function Background(){
    return (
        <div className="homepageImageContainer">
            <div className="mainBackground hpSize">
                <img src={process.env.PUBLIC_URL + '/images/background.jpeg'} alt="background" className = "bgImage"/>
            </div>
            <div className = "mainBackground hpSize darken" />
      </div>
    );
}

function DropdownOption({type}){
  var href = "";
  switch(type){
    case 'Instagram':
      href = 'https://www.instagram.com/_alivanov__/'
      break;
    case 'YouTube':
      href = 'https://www.youtube.com/@alivanov247';
      break;
    case 'Discord':
      href = 'https://discord.com/invite/Pge52B5U';
      break;
    default:
      console.log('Error!')
      break;
  }

  return (
    <a href={href} className = 'SocialDropdownOption'>
      <img className = 'socialOption' src={process.env.PUBLIC_URL + '/images/' + type + 'Logo.png'}/>
    </a>
    );
}

function SocialDropdown({dropdown}){
  return (
    <div className = {`SocialDropdown ${dropdown ? 'slide-down' : 'slide-up'}`}>
      <DropdownOption type = 'Discord'/>
      <DropdownOption type = 'Instagram'/>
      <DropdownOption type = 'YouTube' />
    </div>
  );
}

export default function HomepageImage({modal, expanded}){
    return (
      <div className = 'homepageContainer'>
        <Background />
        <div className = {window.innerWidth > 1200 ? "hp desktopHomepage" : "hp mobileHomepage"}>
          <div className = 'overlayContainer'>
            <div className ="overlay o1">
              <p>Changing the world one step at a time.</p>
            </div>
            <p className="overlay o2">Welcome to the One Dollar Foundation.</p>
            <DonationButton click = {modal}/>
          </div>
          {window.innerWidth > 1200 && <Subscribe />}
        </div>
        <SocialDropdown dropdown = {expanded} />
      </div>
    );
  }