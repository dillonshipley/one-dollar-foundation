import React from 'react';

import Home from './Home';
import About from './About';
import GetInvolved from './GetInvolved';
import Members from './Members';

class Body extends React.Component {

  render(){
    if(this.props.selection === "Home"){
      return(
        <Home />
      );
    } else if(this.props.selection === "About"){
      return(
        <About />
      );
    } else if(this.props.selection === "Get Involved"){
      return(
        <GetInvolved />
      );
    } else if (this.props.selection === "Members"){
      return(
        <Members />
      );
    }
  }
}

export default Body;
