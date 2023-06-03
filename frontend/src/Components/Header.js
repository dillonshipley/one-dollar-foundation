import React from 'react';
import {FadeImage} from './FadeImage';
import '../css/Header.css';
import '../css/HeaderIcons.css';

function Icons() {
  return (
    <div className="icons">
        <FadeImage url="youtube" />
        <FadeImage url="instagram" />
        <FadeImage url="discord" />
    </div>
  );
}

function Dropdown({dropdownSelected}){
  return (
    <div className = "h dropdownIconContainer" onClick = {dropdownSelected}>
      <img src = {process.env.PUBLIC_URL+ "/images/dropdown.png"} className = "dropdownIcon" alt = "darn"/>
    </div>
  )
}

class Header extends React.Component {

  enableDropdown(){
    console.log('beans');
  }

  render(){
    return(
      <div>
        <div className = {window.innerWidth > 800 ? "h headerOne" : "h headerTwo"}>
          <img src={process.env.PUBLIC_URL+ "/images/logo.jpeg"} alt = "Logo" className='h headerImage'></img>
          <div className = 'h headerText'><p className = "ht">The One Dollar Foundation</p></div>
          {window.innerWidth > 800 ? <Icons /> : <Dropdown dropdownSelected = {this.enableDropdown}/>}
        </div>
        <div className = "headerUnderline"></div>
      </div>
    )
  }
}

export default Header;
