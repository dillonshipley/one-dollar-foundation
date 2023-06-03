import React from 'react';

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
                    <label for ="st email label">Email:</label>
                    <input id = "email" className = "st input email" placeholder = "Enter your email here">
                        
                    </input>
                    <label for ="suggestion label">Suggestion:</label>
                    <input className = "input suggestion">
            
                    </input>
                </form>
                <div className = "c">
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
            <div className="mainBackground">
                <img src={process.env.PUBLIC_URL + '/images/background.jpeg'} alt="background" className = "bgImage"/>
            </div>
            <div className = "mainBackground darken" />
      </div>
    );
}
  
export default function HomepageImage({modal}){
    return (
      <div class = 'homepageContainer'>
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
      </div>
    );
  }