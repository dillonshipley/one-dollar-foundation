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
                <div className = "revenueType">Fundraising Event</div>
                <div className = "revenueLocation">{data.Location}</div>
            </div>
            <div className = "revenueDate">{data.Date}</div>
        </div>
    );;
    
}

function PrettySpreadSheet({data}){
    return (
        <div className = 'spreadSheetContainer'>
            <div>Revenues</div>
            <div>Expenses</div>
            {data.map((element, index) => (
                <EventElement data = {element} key = {index} />
            ))}
        </div>
    );
}

export default function Options({excel}){
    const [displayed, setDisplay] = useState('Projects');

    return (
        
    <div className = 'homepageSectionThree'>
        <div className = 'options'>
            <div className = "optionTitle">Our Mission</div>
            <div className = 'optionContainer'>
                    <Option image="clipboard" text ='Complete Small Projects' select = {() => setDisplay('Projects')}/>
                    <div className = 'option'>Provide Forward-Thinking Help</div>
                    <Option image="spreadsheet" text = 'Maintain Financial Transparency' select = {() => setDisplay('Finances')}/>
            </div>
        </div>
        <div>
            {displayed === 'Finances' && <PrettySpreadSheet data={excel} />}
        </div>

    </div>
    );
  }