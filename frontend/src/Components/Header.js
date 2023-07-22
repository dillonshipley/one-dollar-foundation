import {FadeImage} from './FadeImage';
import '../css/Header.css';
import '../css/HeaderIcons.css';
import '../css/SocialDropdown.css';
import React, {useState} from 'react';

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

export default function Header({propsFunc}) {
  const [dropdown, setDropdown] = useState(false);

  const enableDropdown = () => {
    setDropdown(!dropdown)
    propsFunc(dropdown);
    console.log("dropdown is " + dropdown);
  }

  return(
      <div className = {window.innerWidth > 800 ? "h headerOne header" : "h headerTwo header"}>
        <img src={process.env.PUBLIC_URL+ "/images/logo.jpeg"} alt = "Logo" className='h headerImage'></img>
        <div className = 'h headerText'><p className = "ht">The One Dollar Foundation</p></div>
        {window.innerWidth > 800 ? <Icons /> : <Dropdown swap = {() => enableDropdown()} status = {dropdown}/>}
      </div>
  )
}
