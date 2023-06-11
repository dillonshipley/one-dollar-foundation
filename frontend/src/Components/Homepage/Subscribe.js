import React, {useState, useEffect} from "react";

export default function Subscribe(){
    const [suggestion, toggleSuggestion] = useState(true);

    /*
    const myInput = document.getElementById('myInput');
    const myDiv = document.getElementById('myDiv');
    
    myInput.addEventListener('input', function() {
        if (myInput.value.trim() !== '') {
          myDiv.style.display = 'none';
        } else {
          myDiv.style.display = 'block';
        }
      });
    */
   
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
                    <div className = "suggestionContainer input st lh2" onClick = {() => toggleSuggestion(!suggestion)}>
                      {suggestion && <div className = "suggestionOverlay lh2">Please let us know of any events in your community you'd like us to be involved in</div>}
                      <textarea id = "suggestionInput" className = "st input suggestion lh2" rows="2"></textarea>
                    </div>            
                </form>
                
                <div className = "moreSubText c">
                  <p className = "st email">We will <u>only</u> email you once a month for our newsletter and expenditures report.</p>
                  <p className = "st nospam">We will never send you email asking for money or personal information.</p>
                  <div className = "subscribeButton">Subscribe</div>
                </div>
            
            </div>
        </div>
    );
  }