import React, {Component} from 'react';
import './App.css';
import Header from "./Components/Header";
import Body from "./Components/Body";

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      selection: "Home"
    }
  }

  changeSelection(newSelection){
    this.setState({selection: newSelection});
  }

  renderBody(selection){
    return <Body selection = {this.state.selection} />;
  }

  render(){
    return (
      <div className="App">
        <Header />
        {this.renderBody()}
      </div>
    );
  }
}

export default App;
