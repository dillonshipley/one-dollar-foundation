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



class Header extends React.Component {
  render(){
    return(
      <div>
        <div className = "header">
          <img src={process.env.PUBLIC_URL+ "/logo.jpeg"} alt = "Logo" className='headerImage'></img>
          <p className = 'headerText'>The One Dollar Foundation</p>
          {(window.innerWidth >= 950) && <Icons />}
        </div>
        <div className = "headerUnderline"></div>
      </div>
    )
  }
}

export default Header;
