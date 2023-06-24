import React from 'react';
import './css/App.css';
import './css/Mobile.css'
import Header from "./Components/Header";
import Body from "./Components/Body";
import Unsubscribe from "./Components/Unsubscribe"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Main({dropdown, displayBody}){
  return (
    <div className = "App">
        <Header dropdown = {dropdown}/>
        {displayBody()}
    </div>
  )
}

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
      <div className = "router">
        <BrowserRouter>
        <Routes>
            <Route path="/" element = {<Main dropdown = {(e) => this.setDropdown(e)} displayBody={() => this.displayBody()}/>} />
            <Route path="/unsubscribe" element = {<Unsubscribe />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
