import React from 'react';
import venmoImg from './venmo.jpg'
import cashAppImg from './cashapp.jpeg'

function DonationOption(props){
  if(props.selected === props.text){
    return (
      <div>
        <div className = "donationMethodOption">{props.text}</div>
        <div className = "donationMethodSelected"></div>
      </div>
    );
  } else {
    return (
      <div className = "donationMethodOption" onClick = {props.select}>{props.text}</div>
    )
  }
}

function DonationDetail({type}){
  var img;
  if(type == "venmo")
    img = venmoImg
  else
    img = cashAppImg

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
      selected: "venmo",
    }
  }

  select(option){
    if(option === "venmo"){
      this.setState({selected: "venmo"});
    } else if (option === "cashApp"){
      this.setState({selected: "cashApp"});
    } else if (option === "Credit Card"){
      this.setState({selected: "Credit Card"});
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
              <DonationOption text = "Venmo" select = {(e) => this.select("venmo", e)} selected = {this.state.selected} />
              <DonationOption text = "CashApp" select = {(e) => this.select("cashApp", e)} selected = {this.state.selected} />            </div>
            <DonationDetail type = {this.state.selected}/>
          </div>
        </div>
      )
    }
  }
}
