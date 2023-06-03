import React from 'react';
import {FadeImage} from './FadeImage';
import '../css/Header.css';

function Icons() {
  return (
    <div className="icons">
        <FadeImage url="youtube" />
        <FadeImage url="instagram" />
        <FadeImage url="discord" />
    </div>
  );
}

function Dropdown(){
  return (
    <div className = "h dropdownIconContainer">
      <img src = {process.env.PUBLIC_URL+ "/images/dropdown.png"} className = "dropdownIcon" alt = "darn"/>
    </div>
  )
}

class Header extends React.Component {
  render(){
    return(
      <div>
        <div className = {window.innerWidth > 800 ? "h headerOne" : "h headerTwo"}>
          <img src={process.env.PUBLIC_URL+ "/images/logo.jpeg"} alt = "Logo" className='h headerImage'></img>
          <div className = 'h headerText'><p className = "ht">The One Dollar Foundation</p></div>
          {window.innerWidth > 800 ? <Icons /> : <Dropdown />}
        </div>
        <div className = "headerUnderline"></div>
      </div>
    )
  }
}

export default Header;
