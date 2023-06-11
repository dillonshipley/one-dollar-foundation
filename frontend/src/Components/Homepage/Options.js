import React, {useState} from 'react';

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
          <img src={process.env.PUBLIC_URL+ "/logos/" + image + ".png"} alt='darn' className = 'optionIcon'/>
          <div className = 'optionText'>{text}</div>
        </div>
      );
}

function EventElement({data, index}){
    return (
        <div className = "revenue">
            <div className = "revenueLineOne">
                <div className = "revenueType">{data.Source}</div>
                <div className = "revenueLocation">{data.Location}</div>
            </div>
            <div className = "revenueDate">{data.Date}</div>
        </div>
    );;
    
}

function PrettySpreadSheet({revenues, expenses}){
    return (
        <div className = 'spreadSheetContainer'>
            <div className = 'excelHeader'>
                <div className = 'excelHeaderText'>Revenues</div>
                <div className = 'excelHeaderText'>Expenses</div>
            </div>
            {revenues.map((element, index) => (
                <EventElement data = {element} key = {index} />
            ))}
            {expenses.map((element, index) => (
                <EventElement data = {element} key = {index} />
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

export default function Options({excel}){
    const [displayed, setDisplay] = useState('Projects');

    return (
        <>
            <div className = "optionTitle">Our Mission</div>
            <div className = 'homepageSectionThree'>
                
                <div className = 'options'>
                    <div className = 'optionContainer'>
                            <Option image="clipboard" text ='Complete Small Projects' select = {() => setDisplay('Goals')}/>
                            <div className = 'option'>Provide Forward-Thinking Help</div>
                            <Option image="spreadsheet" text = 'Maintain Financial Transparency' select = {() => setDisplay('Finances')}/>
                    </div>
                </div>
                {displayed === "Goals" && <GoalContainer data = {excel[2]}/>}
                {displayed === 'Finances' && <PrettySpreadSheet revenues={excel[0]} expenses = {excel[1]} />}

            </div>
    </>
    );
  }