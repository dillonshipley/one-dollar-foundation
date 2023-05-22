import React from 'react';


function Icon({link, url, cssClass}){
  var divClass = 'iconContainer';
  if(cssClass == 'instagram')
    divClass =  divClass +  ' l40'

  return(
    <a class = {divClass} href = {url}>
      <div class = 'iconSpacer'></div>
      <img src = {process.env.PUBLIC_URL + link} alt = 'logo' class = {cssClass + " icon"} />
      <div class = 'iconSpacer'></div>
    </a>
  );
}

class Header extends React.Component {

  constructor(props){
    super(props);
  }

  change(){

  }

  render(){
    return(
      <div>
        <div className = "header">
          <img src={process.env.PUBLIC_URL+ "/logo.jpeg"} alt = "Logo" class='headerImage'></img>
          <p class = 'headerText'>The One Dollar Foundation</p>
          <Icon link = "/instagram.png" url = 'https://www.instagram.com/_alivanov__/' cssClass = "instagram"/>
          <Icon link = "/youtube.png" url = 'https://www.youtube.com/@alivanov247' cssClass = "youtube" />
          <Icon link = "/discord.png" url = 'a' cssClass = "discord" />
        </div>
        <div className = "headerUnderline"></div>
      </div>
    )
  }
}

export default Header;
