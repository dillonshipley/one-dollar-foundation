import React from 'react';
import VenmoImg from './venmo.jpg'
import CashAppImg from './cashapp.jpeg'
import VenmoLogo from './VenmoLogo.png'
import CashAppLogo from './CashAppLogo.png'

function DonationOption(props) {
  const img = props.text === 'Venmo' ? VenmoLogo : CashAppLogo;

  if (props.selected === props.text) {
    return (
      <div>
        <div className="donationMethodOption">
          <img src={img} alt="fuck" className={props.text + 'Logo'} />
        </div>
        {props.selected === props.text && <div className="donationMethodSelected" />}
      </div>
    );
  } else {
    return (
      <div className="donationMethodOption" onClick={props.select}>
        <img src={img} alt="fuck" className={props.text + 'Logo'} />
      </div>
    );
  }
}

function DonationDetail({type}){
  var img;
  if(type == "Venmo")
    img = VenmoImg
  else
    img = CashAppImg

  return (
    <>
      <img src = {img} alt = {type + " is broken"} className = {type + "QR"}/>
      <p style = {{marginTop: "15px"}}>Select scan in the {type} app.</p>
    </>
  )
}

export default class DonationModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      selected: "Venmo",
    }
  }

  select(option){
    if(option === "Venmo"){
      this.setState({selected: "Venmo"});
    } else if (option === "CashApp"){
      this.setState({selected: "CashApp"});
    }
  }

  render(){
    if(!this.props.show){
      return null;
    } else {
      return(
        <div className = "modalContainer" onClick = {this.props.close}>
          <div className = "donationModal" onClick = {e => e.stopPropagation()}>
            <div className = "donationMethodOptionContainer">
              <DonationOption text = "Venmo" select = {(e) => this.select("Venmo", e)} selected = {this.state.selected} />
              <DonationOption text = "CashApp" select = {(e) => this.select("CashApp", e)} selected = {this.state.selected} />            </div>
            <DonationDetail type = {this.state.selected}/>
          </div>
        </div>
      )
    }
  }
}
