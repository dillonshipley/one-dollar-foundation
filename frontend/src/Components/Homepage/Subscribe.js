import React, {useState, useEffect} from "react";

export default function Subscribe(){
   
    const postSubscribe = () => {
      console.log("clicked");
      fetch('http://localhost:3001/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: "hiiiii"
      });
    }

    return (
        <div className = "subscribeContainer">
          <div className = "subscribe">
            <div className = "c">
              <div className = "subscribeHeader">Subscribe to see how we use every dollar donated.</div>
            </div>

            <form>
                <label htmlFor ="email" className = "st label">Email:</label>
                <input id = "email" className = "st input" placeholder = "Enter your email here">
                    
                </input>
                <label htmlFor ="suggestion label">Suggestion:</label>
                <div className = "suggestionContainer input st lh2">
                  <textarea id = "suggestionInput" placeholder = "Please let us know of any events in your community you'd like us to be involved in" className = "st input suggestion lh2" rows="2"></textarea>
                </div>            
            </form>
            
            <div className = "c">
              <p className = "moreSubText email">We will <u>only</u> email you once a month for our newsletter and expenditures report.</p>
              <p className = "moreSubText nospam">We will never send you email asking for money or personal information.</p>
              <div className = "subscribeButton" onClick = {() => postSubscribe()}>
                <div>Subscribe</div>
              </div>
            </div>
          
          </div>
        </div>
    );
  }