import React, {useState} from 'react';


function EventElement({data, type, index}){
    return (
        <div className = "event">
            <div className = "eventLineOne">
                {type==="revenues" && <div className = "eventType">{data.Source}</div>}
                {type === "expenses" && <div className = "eventType">{data.Event}</div>}
                <div className = "eventLocation">{data.Location}</div>
            </div>
            <div className = "eventLineOne">
                <div className = "eventDate">{data.Date}</div>
                {type==="revenues" && <div className = "eventAmount">{data.Amount}</div>}
                {type === "expenses" && <div className = "eventAmount">-{data.Amount}</div>}
            </div>
        </div>
    );;
    
}

function PrettySpreadSheet({revenues, expenses}){
    const [selected, setIsSelected] = useState('revenues');

    return (
        <div className = 'spreadSheetContainer'>
            <div className = 'excelHeader'>
                <div className = 'excelHeaderText' onClick = {() => setIsSelected("revenues")}>Revenues</div>
                <div className = 'excelHeaderText' onClick = {() => setIsSelected("expenses")}>Expenses</div>
            </div>
            {selected === 'revenues' && revenues.map((element, index) => (
                <EventElement data = {element} type = "revenues" key = {index} />
            ))}
            {selected === "expenses" && expenses.map((element, index) => (
                <EventElement data = {element} type = "expenses" key = {index} />
            ))}
        </div>
    );
}

function Goal({data}){
    return(
        <div>
            
        </div>
    );
}

function GoalContainer({data}){
    return (
        <div className = "goalContainer">
            <div className="goalImages">
                <Goal data = {data[0]}/>
                <Goal data = {data[1]}/>
                <Goal data = {data[2]}/>
            </div>
            <div className = "goalText">
                <p></p>
                <p></p>
                <p></p>
            </div>

        </div>
    )
}

function Option({image, text, select}){
    const [isHovered, setIsHovered] = useState(false);
  
    const handleMouseOver = () => {
      setIsHovered(true);
    };
  
    const handleMouseOut = () => {
      setIsHovered(false);
    };

    return (
        <div className={isHovered ? 'optionHovered option' : 'option'}
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
    const [displayed, setDisplay] = useState('Projects');

    return (
        <>
            <div className = "optionTitle">Our Mission</div>
            <div className = 'homepageSectionThree'>
                
                <div className = 'options'>
                    <div className = 'optionContainer'>
                            <Option image="goals" text ='Complete Small Projects' select = {() => setDisplay('Goals')}/>
                            <Option image = 'help' text = 'Provide Forward-Thinking Help' select = {() => setDisplay('Help')}/>
                            <Option image="spreadsheet" text = 'Maintain Financial Transparency' select = {() => setDisplay('Finances')}/>
                    </div>
                </div>
                {displayed === "Goals" && <GoalContainer data = {excel[2]}/>}
                {displayed === 'Finances' && <PrettySpreadSheet revenues={excel[0]} expenses = {excel[1]} />}

            </div>
    </>
    );
  }