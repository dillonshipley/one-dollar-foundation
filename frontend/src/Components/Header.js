import React, { useEffect, useState } from 'react';
import {FadeImage} from './FadeImage';
import '../css/Header.css';

function Icons() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  console.log('rendering');

  return (
    <div className="icons">
      {screenWidth >= 950 && (
        <>
          <FadeImage url="youtube" />
          <FadeImage url="instagram" />
          <FadeImage url="discord" />
        </>
      )}
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
