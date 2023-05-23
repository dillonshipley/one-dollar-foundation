import React from "react";

export function FadeImage ({url}){
    var href = "";
    switch(url){
      case 'instagram':
        href = 'https://www.instagram.com/_alivanov__/'
        break;
      case 'youtube':
        href = 'https://www.youtube.com/@alivanov247';
        break;
      case 'discord':
        href = 'https://discord.com/invite/Pge52B5U';
        break;
      default:
        console.log('Error!')
        break;
    }
  
    return (
      <a href={href}className="image-container">
        <img src={'/logos/' + url + ".png"} alt="Background" className={"icon " + url + " visible"} />
        <img src={'/logos/' + url + "_color.png"} alt="Fading" className={"icon " + url + "_colors fade"}/>
      </a>
    );
  };