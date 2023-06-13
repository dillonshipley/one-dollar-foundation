import React, {useState, useEffect} from 'react';


function EventElement({data, type, index}){

    let imgSrc = null;
    if(type === "revenues")
        imgSrc = process.env.PUBLIC_URL + '/logos/checkmark.png';
    else
        imgSrc = process.env.PUBLIC_URL + '/logos/achievement.png';

    return (
        <div class = "event">
            <div className = "eventImage">
                <img className = "eventImage" src= {imgSrc} />
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

    return (
        <div className = 'spreadSheetContainer'>
            <div className = 'excelHeader'>
                <div className = 'excelHeaderText' onClick = {() => setIsSelected("revenues")}>Revenues</div>
                {window.innerWidth > 1600 && <div className = 'excelHeaderText' onClick = {() => setIsSelected("expenses")}>Expenses</div>}
            </div>
            <div className = {window.innerWidth > 1600 ? 'spreadSheetData col' : 'spreadSheetData ind'}>
                <div className = 'revContainer'>
                    {selected === 'revenues' && revenues.map((element, index) => (
                        <EventElement data = {element} type = "revenues" key = {index} />
                    ))}
                </div>
                <div className = 'expContainer'>
                    {(selected === "expenses" || window.innerWidth > 1600) && expenses.map((element, index) => (
                        <EventElement data = {element} type = "expenses" key = {index} />
                    ))}
                </div>
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
                <Goal amount = {data[0].Amount} goal = {data[0].Goal} prog = {20}/>
                <Goal amount = {data[1].Amount} goal = {data[1].Goal} prog = {20}/>
                <Goal amount = {data[2].Amount} goal = {data[2].Goal} prog = {30}/>
            </div>
        </div>
    )
}

function Option({image, text, select, selected}){
    const [isHovered, setIsHovered] = useState(false);
    const [optionClass, setOptionClass] = useState("option")
  
    const handleMouseOver = () => {
      setIsHovered(true);
    };
  
    const handleMouseOut = () => {
      setIsHovered(false);
      setOptionClass(buildString);
    };

    const buildString = () => {
        let classString = "optionDesktop ";
        if(window.innerWidth < 1200)
            classString = "optionMobile ";
        if(isHovered)
            classString = classString + "optionHovered ";
        if(image === selected)
            classString = classString + "optionSelected "
        
    }

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

export default function Options({excel}){
    const [displayed, setDisplay] = useState('goals');

    return (
        <>
            <div className = "optionTitle">Our Mission</div>
            <div className={window.innerWidth > 1200 ? 'h3d' : 'h3m'}>
                
                <div className = {window.innerWidth > 1200 ? 'optionsDesktop' : 'optionsMobile'}>
                        <Option image="goals" text ='Complete Small Projects' select = {() => setDisplay('goals')} selected = {displayed}/>
                        <Option image = 'help' text = 'Provide Forward-Thinking Help' select = {() => setDisplay('help')} selected = {displayed}/>
                        <Option image="spreadsheet" text = 'Maintain Financial Transparency' select = {() => setDisplay('spreadsheet')} selected = {displayed}/>
                </div>
                {(displayed === "goals" && excel && excel.length > 2) && <GoalContainer data = {excel[2]}/>}
                {displayed === 'spreadsheet' && <PrettySpreadSheet revenues={excel[0]} expenses = {excel[1]} />}

            </div>
    </>
    );
  }