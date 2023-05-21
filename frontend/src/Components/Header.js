import React from 'react';


function HeaderOption(props){

  return(
    <div className = "headerOptions" onClick = {(e) => props.change(props.text)}>
      <p id = {"headerOption" + props.num}>{props.text}</p>
    </div>
  )
}

class Header extends React.Component {

  constructor(props){
    super(props);
  }

  change(){

  }

  render(){
    return(
      <div className = "header">
        <img src = "logo" alt = "words"/>
        <div className = "headerSpacerDiv"></div>
        <div className = "headerOptionContainer">
          <HeaderOption text = "Home" num = {1} change = {(e) => this.props.change(e)} />
          <HeaderOption text = "About" num = {2} change = {(e) => this.props.change(e)}/>
          <HeaderOption text = "Get Involved" num = {3} change = {(e) => this.props.change(e)}/>
          <HeaderOption text = "Members" num = {4} change = {(e) => this.props.change(e)}/>
        </div>
      </div>
    )
  }
}

export default Header;
