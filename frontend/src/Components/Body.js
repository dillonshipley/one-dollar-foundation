import React from 'react';
import DonateModal from './DonateModal';
import Footer from "./Footer";
import Options from './Homepage/Options'
import '../css/Options.css';
import '../css/Subscribe.css';
import Homepage from './Homepage/Homepage';

async function logJSONData() {
  const response = await fetch("http://localhost:3001/");
  const jsonData = await response.json();
  return jsonData;
}

class Body extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      footer: props.footer,
      modal: false,
    };
  }

  componentDidMount(){
    const excelData = logJSONData()
    .then((data) => {
      console.log(data);
      this.setState({optionsExcel: data});
      console.log(this.state.optionsExcel);
    });
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
            <div className = 'quoteContainer flex'>
              <p className = 'quote'>"Every good act is charity. A man's true wealth hereafter is the good that he does in this world to his fellows." - Moliere</p>
            </div>
            <div className = "imageContainer">
              <img src={process.env.PUBLIC_URL + '/quote.jpg'} alt='Quote here' className ="quoteImg"/>
            </div>
        </div>
        <Options excel = {this.state.optionsExcel}/>
        {this.props.footer && <Footer />}
        <DonateModal show={this.state.modal} close = {this.hideModal}/>
      </div>
    );
  }
}

export default Body;
