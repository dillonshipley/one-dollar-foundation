import React, {useState} from 'react';

function EventElement({data, type, index}){

    let imgSrc = null;
    if(type === "rev")
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

function EventHolder({type, data}){
    return(    
        <div className = 'eventContainer'>
            <div className = "excelHeader">
                <div className = 'excelHeaderText'>{type === "rev" ? "Revenues" : "Expenses"}</div>
            </div>
            {data.map((element, index) => (
                <EventElement data = {element} type = {type} key = {index} />
            ))}
        </div>
    )
}

export default function PrettySpreadSheet({revenues, expenses}){
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
        <>
        {/*
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
            */}
            <div className = {"excelContainer " + (window.innerWidth > 1600 ? " twoCol" : " oneCol")}>
                <EventHolder type = "rev" data = {revenues} />
                {(selected === "expenses" || window.innerWidth > 1600) &&  <EventHolder type = "exp" data = {expenses} />}
            </div>
        </>
    );
}