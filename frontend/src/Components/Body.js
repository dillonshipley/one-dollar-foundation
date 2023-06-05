import React, {useState} from 'react';
import DonateModal from './DonateModal';
import Footer from "./Footer";
import '../css/Options.css';
import '../css/Subscribe.css';
import Homepage from './Homepage/Homepage';


function Option({image, text}){
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div className={isHovered ? 'optionHovered option' : 'option'}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      >
      <img src={process.env.PUBLIC_URL+ "/logos/" + image + ".png"} alt='darn' className = 'optionIcon'/>
      <div className = 'optionText'>{text}</div>
    </div>
  );
}

function Options(){
  return (
    <div className = 'options'>
      <div className = "optionTitle">Our Mission</div>
      <div className = 'optionContainer'>
        <Option image="clipboard" text ='Complete Small Projects' />
        <div className = 'option'>Provide Forward-Thinking Help</div>
        <Option image="spreadsheet" text = 'Maintain Financial Transparency' />
      </div>
    </div>
  );
}



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
      <div>
        <Homepage modal = {this.showModal} expanded = {this.props.dropdown}/>
        <div className = "homepageSectionTwo">
            <p className = 'quote'>"Every good act is charity. A man's true wealth hereafter is the good that he does in this world to his fellows. - Moliere"</p>
            <div className = "imageContainer">
              <img src={process.env.PUBLIC_URL + '/quote.jpg'} alt='Quote here' className ="quoteImg"/>
            </div>
        </div>
        {this.props.footer && <Footer />}
        <div className = "homepageSectionThree">
          <Options />
        </div>
        <DonateModal show={this.state.modal} close = {this.hideModal}/>
      </div>
    );
  }
}

export default Body;
