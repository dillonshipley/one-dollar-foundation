import React, {Component, useState} from 'react';
import DonationModal from './DonateModal'
import '../Mobile.css'

var infoText = "When one person gives, another person receives, and simple donations of $1 add up over time. This success of this process depends on group participation, commitment, and making a small sacrifice to uplift the less fortunate. Are you ready to get involved?";


class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showDonationModal: false,
    }
  }

  showDonationModal(){
    this.setState({showDonationModal: !this.state.showDonationModal});
  }

  render(){
    return (
      <div id = "HomeContainer" className = "show">
        <div id = "mainSection">
          <div className = "largeGreeting">Welcome to the $1 Foundation.</div>
          <div className = "moreInfoText">
              <p className = "homepageInfoText">{infoText}</p>
              <div className = "moreInfoSpacer"></div>
              <div onMouseEnter = {() => this.setState({moreHovered: true})} onMouseLeave = {() => this.setState({moreHovered: false})}>
                {this.state.moreHovered && (
                  <p className = "homePageInfoText readMore">Read More</p>
                )}
                {!this.state.moreHovered && (
                  <p className = "homePageInfoText moreHovered">Read More</p>
                )}
              </div>
          </div>
        </div>
        <div className = "donationButtonSection">
          <div className = "donationButton" onClick = {() => {this.showDonationModal()}}>
            <p className = "donationText">Step Up Now.</p>
          </div>
        </div>
        <DonationModal onClose = {() => {this.showDonationModal()}} show = {this.state.showDonationModal}/>
      </div>
    );
  }
}

export default Home;
