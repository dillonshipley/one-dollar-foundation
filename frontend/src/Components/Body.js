import React from 'react';

function HomepageImage(){
  return (
    <div class = "rel">
      <div className="homepageImageContainer">
        <img src={process.env.PUBLIC_URL + '/background.jpeg'} alt="background" className="mainBackground" />
        <p className="overlay o1">Changing the world one step at a time.</p>
        <p className="overlay o2">Welcome to the One Dollar Foundation.</p>
      </div>
    </div>
  );
}

function DonationButton(){
  return(
    <div className="donationButtonSection">
      <div className="donationButton" onClick={() => { this.showDonationModal() }}>
        <p className="donationText">Step Up Now &gt;</p>
      </div>
    </div>
  );
}

class Body extends React.Component {
  render(){
    return(
      <div>
        <div className = "homepageContainer">
          <HomepageImage />
          <DonationButton />
        </div>
        <div className = "homepageSectionTwo">
            <p class = 'quote'>"Every good act is charity. A man's true wealth hereafter is the good that he does in this world to his fellows. - Moliere"</p>
            <img src={process.env.PUBLIC_URL + '/quote.jpg'} alt='Quote here' class ="quoteImg"/>
        </div>
        <div className = "homepageSectionThree">
          <div className = 'optionContainer'>
            <div>option 1</div>
            <div>option 2</div>
            <div>option 3</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
