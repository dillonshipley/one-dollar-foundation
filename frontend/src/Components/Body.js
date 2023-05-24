import React, {useState} from 'react';

function HomepageImage(){
  return (
    <div className = "rel">
      <div className="homepageImageContainer">
        <img src={process.env.PUBLIC_URL + '/background.jpeg'} alt="background" className="mainBackground" />
        <p className="overlay o1">Changing the world one step at a time.</p>
        <p className="overlay o2">Welcome to the One Dollar Foundation.</p>
      </div>
    </div>
  );
}

function DonationButton({click}){
  return(
    <div className="donationButtonSection">
      <div className="donationButton" onClick={click}>
        <p className="donationText">Step Up Now &gt;</p>
      </div>
    </div>
  );
}

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
      modal: false
    }
  }

  showModal = () => {
    console.log("modal");
    this.setState({modal: true})
    const element = document.getElementById('modalContainer');
    element.classList.add('z3');
    element.classList.remove('z1');

  }

  hideModal = () => {
    console.log("unmodal")
    if(this.state.modal)
      this.setState({modal: false})
    const element = document.getElementById('modalContainer');
    element.classList.add('z1');
    element.classList.remove('z3');
  }

  render(){
    return(
      <div>
        <div className = "homepageContainer">
          <HomepageImage />
          <DonationButton click={this.showModal}/>
        </div>
        <div className = "homepageSectionTwo">
            <p className = 'quote'>"Every good act is charity. A man's true wealth hereafter is the good that he does in this world to his fellows. - Moliere"</p>
            <img src={process.env.PUBLIC_URL + '/quote.jpg'} alt='Quote here' className ="quoteImg"/>
        </div>
        <div className = "homepageSectionThree">
          <Options />
        </div>
        <div id= 'modalContainer' className = 'z1' onClick={this.hideModal}>
          {this.state.modal && <div className = 'donationModal'></div>}
        </div>
      </div>
    );
  }
}

export default Body;
