import React, { useState, useEffect } from 'react';


function Icon({link, url, cssClass}){
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if(cssClass !== 'youtube'){
    return(
    <a className = 'iconContainer' href = {url}>
      <img src = {process.env.PUBLIC_URL + link} alt = 'logo' className = {cssClass + " icon"} />
    </a>
    );
  }
}

const FadeImage = ({url}) => {
  return (
    <div className="image-container">
      <img src={'/logos/' + url + ".png"} alt="Background Image" className={"icon " + url + " visible"} />
      <img src={'/logos/' + url + "_color.png"} alt="Fading Image" className={"icon " + url + "_colors fade"}/>
    </div>
  );
};

class Header extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        
        <div className = "header">
          <img src={process.env.PUBLIC_URL+ "/logo.jpeg"} alt = "Logo" className='headerImage'></img>
          <p className = 'headerText'>The One Dollar Foundation</p>
          <div className = 'icons'>
            <FadeImage url = 'youtube'/>
            <FadeImage url = 'instagram' />
            <FadeImage url = 'discord'/>
          </div>
        </div>
        <div className = "headerUnderline"></div>
      </div>
    )
  }
}

export default Header;
