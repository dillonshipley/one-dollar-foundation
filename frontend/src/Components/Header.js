import React from 'react';

const FadeImage = ({url}) => {
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

class Header extends React.Component {
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
