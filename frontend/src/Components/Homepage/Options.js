import React, {useState, useEffect, useCallback} from 'react';

import { streamToArray } from 'stream-to-array';

const convertStreamToJson = async (stream) => {
    try {
      const chunks = await streamToArray(stream);
      const combinedString = chunks.join('');
  
      const jsonData = JSON.parse(combinedString);
      return jsonData;
    } catch (error) {
      console.error('Error converting stream to JSON:', error);
    }
  };
  
  async function logJSONData() {
    fetch("https://localhost:3001/")
    .then(async (response) => {
        console.log(response);
        const json = await response.json();
        console.log("printing data:" + json);
    })
  }

function EventElement({data, type, index}){

    let imgSrc = null;
    if(type === "revenues")
        imgSrc = process.env.PUBLIC_URL + '/logos/checkmark.png';
    else
        imgSrc = process.env.PUBLIC_URL + '/logos/achievement.png';

    return (
        <div class = "event">
            <div className = "eventImage">
                <img className = "eventImage" alt = "Couldn't find event pic!" src= {imgSrc} />
            </div>
            <div className = "eventDetail">
            <div className = "eventLineOne">
                    {type==="revenues" && <div className = "eventType revenue">{data.Source}</div>}
                    {type === "expenses" && <div className = "expense eventType">{data.Event}</div>}
                    <div className = "eventLocation">{data.Location}</div>
                </div>
                <div className = "eventLineOne">
                    <div className = "eventDate">{data.Date}</div>
                    {type==="revenues" && <div className = "eventAmount">{data.Amount}</div>}
                    {type === "expenses" && <div className = "eventAmount">-{data.Amount}</div>}
                </div>
            </div>
        </div>
    );
    
}

function PrettySpreadSheet({revenues, expenses}){
    const [selected, setIsSelected] = useState('revenues');

    let totalRaised = 0;
    for (let i = 0; i < revenues.length; i++) {
        totalRaised += revenues[i]["Amount"];
      }
      console.log(totalRaised);

    let currentBalance = totalRaised;
    for (let i = 0; i < expenses.length; i++) {
        currentBalance -= expenses[i]["Amount"];
      }
      console.log(currentBalance);

    return (
        <div className = 'spreadSheetContainer'>
            <div className = 'excelHeader'>
                {selected === "revenues" && <div className = 'excelHeaderText' onClick = {() => setIsSelected("expenses")}>Revenues</div>}
                {(window.innerWidth > 1600 || selected === "expenses") && <div className = 'excelHeaderText' onClick = {() => setIsSelected("revenues")}>Expenses</div>}
            </div>
            <div className = {window.innerWidth > 1600 ? 'spreadSheetData col' : 'spreadSheetData ind'}>
                <div className = 'eventContainer'>
                    {selected === 'revenues' && revenues.map((element, index) => (
                        <EventElement data = {element} type = "revenues" key = {index} />
                    ))}
                </div>
                {(selected === "expenses" || window.innerWidth > 1600) &&  
                    <div className = 'eventContainer'>
                        {expenses.map((element, index) => (
                            <EventElement data = {element} type = "expenses" key = {index} />
                        ))}
                    </div>
                }
            </div>
            <div className = "financialTotals">
                <div className = "financialText">Total Raised: ${totalRaised}</div>
                <div className = "financialText ftOver">Fund Balance: ${currentBalance}</div>
            </div>
           
        </div>
    );
}

function Goal({amount, goal, prog}){

    return (
        <div className = "individualGoal">
            <div className="vertical-progress-bar">
                <div className="progress" style={{ width: `${(1 - (prog / amount)) * 100}%` }}></div>
                <div className = "progressPercentage">
                    {(prog / amount) * 100}%
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

export default function Options({excel}){
    const [displayed, setDisplay] = useState('help');

    useEffect(() => {
        logJSONData()
        .then((data) => {
            console.log(data);
            this.setState({optionsExcel: data});
            console.log(this.state.optionsExcel);
        });
    });

    return (
        <>
            <div className = "optionTitle">Our Mission</div>
            <div className={window.innerWidth > 1200 ? 'h3d' : 'h3m'}>
                
                <div className = {window.innerWidth > 1200 ? 'optionContainerDesktop' : 'optionContainerMobile'}>
                        <Option image = 'help' text = 'Provide Forward-Thinking Help' select = {() => setDisplay('help')} selected = {displayed}/>
                        <Option image="goals" text ='Complete Small Projects' select = {() => setDisplay('goals')} selected = {displayed}/>
                        <Option image="spreadsheet" text = 'Maintain Financial Transparency' select = {() => setDisplay('spreadsheet')} selected = {displayed}/>
                </div>
                {(displayed === "goals" && excel && excel.length > 2) && <GoalContainer data = {excel[2]}/>}
                {displayed === 'spreadsheet' && <PrettySpreadSheet revenues={excel[0]} expenses = {excel[1]} />}
                {displayed  === 'help' && <HelpText />}

            </div>
    </>
    );
  }