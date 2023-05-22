import React from 'react';

import Home from './Home';
import About from './About';
import GetInvolved from './GetInvolved';
import Members from './Members';

class Body extends React.Component {

  
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div class = "homepageContainer">
        <img src={process.env.PUBLIC_URL + '/background.jpeg'} class = 'mainBackground'></img>
        <p class = 'overlay o1'>Changing the world one step at a time.</p>
        <p class = 'overlay o2'>Welcome to the One Dollar Foundation.</p>
        <div className = "donationButtonSection">
          <div className = "donationButton" onClick = {() => {this.showDonationModal()}}>
            <p className = "donationText">Step Up Now.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
