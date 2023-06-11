import {FadeImage} from './FadeImage';
import '../css/Header.css';
import '../css/HeaderIcons.css';
import '../css/SocialDropdown.css';
import React from 'react';

function Icons() {
  return (
    <div className="icons">
        <FadeImage url="youtube" />
        <FadeImage url="instagram" />
        <FadeImage url="discord" />
    </div>
  );
}

function Dropdown({swap, status}){
  return (
    <div className = {status ? "h dropdownIconContainer ddClosed" : "h dropdownIconContainer ddOpen"} onClick = {swap}>
      <img src = {process.env.PUBLIC_URL+ "/images/dropdown.png"} className = "dropdownIcon" alt = "darn"/>
    </div>
  )
}

export default class Header extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      dropdown: false,
    }
  }

  enableDropdown = () => {
    let newVal = !this.state.dropdown;
    this.setState({dropdown: newVal});
    this.props.dropdown(newVal);
  }

  render(){
    return(
      <div>
        <div className = {window.innerWidth > 800 ? "h headerOne" : "h headerTwo"}>
          <img src={process.env.PUBLIC_URL+ "/images/logo.jpeg"} alt = "Logo" className='h headerImage'></img>
          <div className = 'h headerText'><p className = "ht">The One Dollar Foundation</p></div>
          {window.innerWidth > 800 ? <Icons /> : <Dropdown swap = {this.enableDropdown} status = {this.state.dropdown}/>}
        </div>
        <div className = "headerUnderline"></div>
      </div>
    )
  }
}
