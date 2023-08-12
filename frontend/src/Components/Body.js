import React from 'react';
import DonateModal from './DonateModal';
import Footer from "./Footer";
import Options from './Options/Options'
import Subscribe from './Homepage/Subscribe'

import '../css/options/Options.css';
import '../css/options/Spreadsheet.css';
import '../css/options/Goals.css';
import '../css/Subscribe.css';

import Homepage from './Homepage/Homepage';

class Body extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      footer: props.footer,
      modal: false,
    };
  }

  showModal = () => {
    this.setState({
      modal: true
    }); 
  };

  hideModal = () => {
    this.setState({
      modal: false
    });
  }

  render(){
    return(
      <div className = "body">
        <Homepage modal = {this.showModal} expanded = {this.props.dropdown}/>
        <div className = "homepageSectionTwo">
            <div className = 'quoteContainer flex'>
              <p className = 'quote'>"Every good act is charity. A man's true wealth hereafter is the good that he does in this world to his fellows." - Moliere</p>
            </div>
            <div className = "imageContainer">
              <img src={process.env.PUBLIC_URL + '/quote.jpg'} alt='Quote here' className ="quoteImg"/>
            </div>
        </div>
        <Options excel = {this.state.optionsExcel}/>
        {window.innerWidth <= 1200 && <Subscribe />}
        {this.props.footer && <Footer />}
        <DonateModal show={this.state.modal} close = {this.hideModal}/>
      </div>
    ); 
  }
}

export default Body;
