import React from 'react';
import '../css/Modal.css';

function DonationOption({text, select, selected}) {
  var img = process.env.PUBLIC_URL + '/images/' + text + "Logo.png"
    return (
      <div className = "donationMethodContainer" onClick={select}>
        <div className="donationMethodOption" >
          <img src={img} alt="fuck" className={text + 'Logo'} />
        </div>
        {selected === text && <div className="donationMethodSelected" />}
      </div>
    );
}

function DonationDetail({type}){
  var img = process.env.PUBLIC_URL + '/images/';
  if(type === "Venmo")
    img = img + type + ".jpg"
  else
    img = img + type + ".jpeg"

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
      this.setState({selected: option});
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
              <DonationOption text = "CashApp" select = {(e) => this.select("CashApp", e)} selected = {this.state.selected} />            
            </div>
            <DonationDetail type = {this.state.selected}/>
          </div>
        </div>
      )
    }
  }
}
