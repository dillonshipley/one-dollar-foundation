import React from 'react';
import venmoImg from './venmo.jpg'

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

function DonationDetail(props){
  if(props.type === "Venmo"){
    return (
      <div>
        <img src = {venmoImg} alt = "this shit broken" className = "venmoQR"/>
        <p style = {{marginTop: "15px"}}>Select "Scan" in the Venmo App.</p>
      </div>
    );
  } else if(props.type === "CashApp"){
    return (
      <div>

      </div>
    );
  } else if(props.type === "Credit Card"){
    return (
      <div>

      </div>
    );
  }
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
    } else if (option === "Credit Card"){
      this.setState({selected: "Credit Card"});
    }
  }

  render(){
    if(!this.props.show){
      return null;
    } else {
      return(
        <div className = "modalContainer" onClick = {this.props.onClose}>
          <div className = "donationModal" onClick = {e => e.stopPropagation()}>
            <div className = "donationMethodOptionContainer">
              <DonationOption text = "Venmo" select = {(e) => this.select("Venmo", e)} selected = {this.state.selected} />
              <DonationOption text = "CashApp" select = {(e) => this.select("CashApp", e)} selected = {this.state.selected} />
              <DonationOption text = "Credit Card" select = {(e) => this.select("Credit Card", e)} selected = {this.state.selected} />
            </div>
            <DonationDetail type = {this.state.selected}/>
          </div>
        </div>
      )
    }
  }
}
