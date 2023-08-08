import React, {useState} from 'react';

function EventElement({data, type, index}){

    let imgSrc = null;
    if(type === "rev")
        imgSrc = process.env.PUBLIC_URL + '/logos/checkmark.png';
    else
        imgSrc = process.env.PUBLIC_URL + '/logos/achievement.png';

    return (
        <div className = "event">
            <div className = "eventImage">
                <img className = "eventImage" alt = "Couldn't find event pic!" src= {imgSrc} />
            </div>
            <div className = "eventDetail">
            <div className = "eventLineOne">
                    {type==="rev" && <div className = "eventType revenue">{data.Source}</div>}
                    {type === "exp" && <div className = "expense eventType">{data.Event}</div>}
                    <div className = "eventLocation">{data.Location}</div>
                </div>
                <div className = "eventLineOne">
                    <div className = "eventDate">{data.Date}</div>
                    {type==="rev" && <div className = "eventAmount">{data.Amount}</div>}
                    {type === "exp" && <div className = "eventAmount">-{data.Amount}</div>}
                </div>
            </div>
        </div>
    );
    
}

function EventHolder({type, data, pos}){
    return(    
        <div className = 'eventContainer'>
            <div className = "excelHeader">
                <div className = {pos ? "excelHeaderText eh1" : "excelHeaderText"}>{type === "rev" ? "Revenues" : "Expenses"}</div>
            </div>
            {data.map((element, index) => (
                <EventElement data = {element} type = {type} key = {index} />
            ))}
        </div>
    )
}

export default function PrettySpreadSheet({revenues, expenses}){
    const [selected, setIsSelected] = useState('rev');
    let imgSrc = process.env.PUBLIC_URL + '/logos/flip.png';

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

    const swapSelected = () => {
        if(selected === 'rev')
            setIsSelected('exp');
        else
            setIsSelected('rev');
    }

    return (
        <div className = "excont">
            {((((window.innerWidth < 1600) && (window.innerWidth > 1200)) ||  window.innerWidth < 600) &&
                <div className = "flip">
                    <img src = {imgSrc} className = "flipImg" alt = "oops" onClick = {swapSelected}/>
                </div>
            )}
            <div className = {"excelContainer " + ((window.innerWidth > 1600 || (window.innerWidth < 1200 && window.innerWidth > 600)) ? " twoCol" : " oneCol")}>
                {((((window.innerWidth < 1600) && (window.innerWidth > 1200)) ||  window.innerWidth < 600) &&
                    <EventHolder type = {selected} data = {selected === 'rev' ? revenues : expenses} pos = {window.innerWidth > 1600}/>
                )}
                {(window.innerWidth > 1600 || (window.innerWidth < 1200 && window.innerWidth > 600)) && <EventHolder type = "rev" data = {revenues} pos = {window.innerWidth > 1600} />}
                {(window.innerWidth > 1600 || (window.innerWidth < 1200 && window.innerWidth > 600)) &&  <EventHolder type = "exp" data = {expenses} pos = {window.innerWidth > 1600}/>}
            </div>
        </div>
    );
}