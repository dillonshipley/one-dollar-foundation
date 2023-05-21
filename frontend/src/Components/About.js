import React, {Component} from 'react';

class About extends React.Component {


  render(){
    return (
        <div id = "AboutContainer">
          <div id = "AboutColumn1">
            <div className = "AboutTitleText" id = "AboutTitle1">What We Do</div>
            <iframe id = "FounderVideo" width="336" height="252" src="https://www.youtube.com/embed/wmxifM9dU50" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div id = "AboutColumn2">
            <div id = "AboutTextContainer">
              <p className = "AboutText" id = "AboutText1">This foundation is based around one idea - that people might be able to fund their community projects through other people investing in their cause, $1 at a time. What do a school, a food drive, or a non-profit art gallery have in common? They serve the members of their community. The One Dollar Foundation is rooted in and centered around commmunities. <br></br><br></br>To donate, please visit the link on our homepage or click here. To submit a proposal for funding, please visit the "Get Involved" page.</p>
            </div>
            <div className = "AboutTitleText" id = "AboutTitle2">Meet the Founder</div>
          </div>
        </div>
    );
  }
}

export default About;
