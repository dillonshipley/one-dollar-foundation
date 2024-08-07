import React, {useState, useEffect, useCallback} from 'react';
import PrettySpreadSheet from './SpreadSheet';
import axios from 'axios'

  
  async function logJSONData() {
    //const response = await fetch("http://localhost:3001/")
    const response = await axios.get("https://one-dollar-foundation-server-kmusbztw2q-uc.a.run.app/");
    //const response = await axios.get("https://odfserver-kmusbztw2q-uc.a.run.app/")
    const json = await response.data;
    return json;
  }


function Goal({amount, goal, prog}){

    return (
        <div className = "individualGoal">
            <div className="goal">
                <div className="progress" style={{ width: `${(1 - (prog / amount)) * 100}%` }}></div>
                <div className = "progressPercentage">
                    {amount !== 0 ? (prog / amount) * 100 : 0}%
                </div>
            </div>
            <div className = "goalTitle">{goal}</div>
        </div>
      );
}

function GoalContainer({data}){
    console.log(data[0].amount);
    return (
        <div className = "goalContainer">
            <div className="goalHeaderText">SHORT-TERM GOALS</div>
            <div className="goalGrid">
                <Goal amount = {data[0].Amount} goal = {data[0].Goal} prog = {data[0].Progress}/>
                <Goal amount = {data[1].Amount} goal = {data[1].Goal} prog = {data[1].Progress}/>
                <Goal amount = {data[2].Amount} goal = {data[2].Goal} prog = {data[2].Progress}/>
            </div>
        </div>
    )
}

function Option({image, text, select, selected}){
    const [isHovered, setIsHovered] = useState(false);
    const [optionClass, setOptionClass] = useState("option")
  
    const buildString = useCallback(() => {
        let classString = "optionDesktop ";
        if(window.innerWidth < 1200)
            classString = "optionMobile ";
        if(isHovered)
            classString = classString + "optionHovered ";
        if(image === selected)
            classString = classString + "optionSelected "
        return classString;
    }, [image, isHovered, selected]);

    useEffect(() => {
        setOptionClass(buildString);
    }, [buildString]);

    const handleMouseOver = () => {
      setIsHovered(true);
    };
  
    const handleMouseOut = () => {
      setIsHovered(false);
      setOptionClass(buildString);
    };

    return (
        <div className={optionClass}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick = {select}
          >
          <img src={process.env.PUBLIC_URL+ "/logos/" + image + ".png"} alt='darn' className = {'optionIcon ' + image}/>
          <div className = 'optionText'>{text}</div>
        </div>  
      );
}

function HelpText(){
    return (
        <div className = "helpTextContainer">
            <div className = "helpTextBig">Our short-term goals are simple.</div>
            <div className = "helpTextBig">Our long-term dreams are limitless.</div>
            <div className = "helpTextAddl">Our initial mission is to help people in immediate need and be a resource in the community for its most vulnerable members.</div>
            <div className = "helpTextAddl">Over time, we want to engineer systemic solutions to the following pressing problems:</div>
            <div className = "helpTextList">1. Reduce the presence of food deserts in "first-world" environments.</div>
            <div className = "helpTextList">2. Host community activities and projects that help reverse the trend of isolation in American society.</div>
            <div className = "helpTextList">3. Create a method of free, temporary housing for the homeless.</div>
        </div>
    )
}

export default function Options(){
    const [displayed, setDisplay] = useState('help');
    const [excel, setExcel] = useState(null);

    useEffect(() => {
        logJSONData()
        .then((data) => {
            console.log("data returned from jsondata is" + data);
            setExcel(data);
        });
    }, []);

    return (
        <>
            <div className = "optionTitle">Our Mission</div>
            <div className={window.innerWidth > 1200 ? 'h3d' : 'h3m'}>
                
                <div className = {window.innerWidth > 1200 ? 'optionContainerDesktop' : 'optionContainerMobile'}>
                        <Option image = 'help' text = 'Provide Forward-Thinking Help' select = {() => setDisplay('help')} selected = {displayed}/>
                        <Option image="goals" text ='Complete Small Projects' select = {() => setDisplay('goals')} selected = {displayed}/>
                        <Option image="spreadsheet" text = 'Maintain Financial Transparency' select = {() => setDisplay('spreadsheet')} selected = {displayed}/>
                </div>
                <div className = "optionDetailContainer">
                    {(displayed === "goals" && excel && excel.length > 2) && <GoalContainer data = {excel[2]}/>}
                    {displayed === 'spreadsheet' && <PrettySpreadSheet revenues={excel[0]} expenses = {excel[1]} />}
                    {displayed  === 'help' && <HelpText />}
                </div>

            </div>
    </>
    );
  }