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
      <div>
        <div className = "homepageContainer">
          <img src={process.env.PUBLIC_URL + '/background.jpeg'} className = 'mainBackground'></img>
          <p className = 'overlay o1'>Changing the world one step at a time.</p>
          <p className = 'overlay o2'>Welcome to the One Dollar Foundation.</p>
          <div className = "donationButtonSection">
            <div className = "donationButton" onClick = {() => {this.showDonationModal()}}>
              <p className = "donationText">Step Up Now.</p>
            </div>
          </div>
        </div>
        <div className = "homepageSectionTwo">
          
        </div>
      </div>
    );
  }
}

export default Body;
