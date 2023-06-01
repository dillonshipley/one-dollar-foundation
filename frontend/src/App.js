import React from 'react';
import './css/App.css';
import './css/Mobile.css'
import Header from "./Components/Header";
import Body from "./Components/Body";

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      selection: "Home",
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
    if(this.state.width <= 600)
      return <Body footer = {true} /> 
    else 
      return <Body footer ={false} />
  }

  render(){
    return (
      <div className="App">
        <Header />
        {this.displayBody()}
      </div>
    );
  }
}

export default App;
