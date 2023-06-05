import React from 'react';
import './css/App.css';
import './css/Mobile.css'
import Header from "./Components/Header";
import Body from "./Components/Body";

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      dropdown: false,
      width: window.innerWidth,
    }
  }

  handleResize = () => {
    this.setState({width: window.innerWidth});
  };

  changeSelection(newSelection){
    this.setState({selection: newSelection});
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  displayBody(){
      return <Body footer = {this.state.width <= 600} dropdown = {this.state.dropdown}/> 
  }

  setDropdown = (e) => {
    this.setState({dropdown: e})
  }

  render(){
    return (
      <div className="App">
        <Header dropdown = {this.setDropdown}/>
        {this.displayBody()}
      </div>
    );
  }
}

export default App;
