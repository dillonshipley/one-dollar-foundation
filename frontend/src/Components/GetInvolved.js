import React, {Component, useState} from 'react';

const titles = ["Project 1", "Project 2", "Project 3"];
const info = ["Info 1", "Info 2", "Info 3"];

function ProjectCard(props){
  const  [hover, setHover] = useState(false);
    return (
      <div  className = "projectCardContainer"
            onMouseEnter = {() => setHover(true)}
            onMouseLeave = {() => setHover(false)}
            id = {"projectCard" + props.num}>
            {hover && (
              <div className = "projectCardHovered">{props.info}</div>
            )}
            {!hover && (
              <div className = "projectCardDefault">{props.title}</div>
            )}
      </div>
    );
}

class GetInvolved extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showingCompleted: false,
    }
  }

  render(){
    return (
      <div id = "GetInvolvedContainer">
        <div id = "CurrentProjectsTitle">Current Projects</div>
        <div id = "projectCardContainer">
          <ProjectCard num = {1} title = {titles[0]} info = {info[0]}/>
          <ProjectCard num = {2} title = {titles[1]} info = {info[1]}/>
          <ProjectCard num = {3} title = {titles[2]} info = {info[2]}/>
        </div>
        <div id = "ShowCompleted">Show Completed Projects</div>
      </div>
    );
  }

}

export default GetInvolved;
