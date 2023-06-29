import React, {useState} from "react";

export default function Subscribe(){
  const [errorList, setErrorList] = useState([]);


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  const sanitizeInput = (input) => {
    // Implement your input sanitization logic here
    // For email validation, you can use the built-in validation functions or a library like DOMPurify.
    // Example using DOMPurify:
    //const sanitizedInput = DOMPurify.sanitize(input);
    return input;
  }
  
  const postSubscribe = () => {
    console.log("Sending subscribe post...");
    const emailInput = document.getElementById('email').value;
    if(emailInput === ''){
      setErrorList(['email'])
    }
    const sanitizedEmailInput = sanitizeInput(emailInput);
    if (validateEmail(sanitizedEmailInput)) {
    } else {
    }

    const suggestionInput = document.getElementById('suggestion').value;
    fetch('https://odfserver-kmusbztw2q-uc.a.run.app/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'email': emailInput, 'suggestion': suggestionInput})
    })
    .then((response) => response.json())
    .then((data)=> {
      console.log(data.message);
    })
  }

    return (
        <div className = "subscribeContainer">
          <div className = "subscribe">
              <div className = "subscribeHeader c">Subscribe to see how we use every dollar donated.</div>
            <form className = "subscribeForm">
                <label htmlFor ="email" className = "st label">Email:</label>
                <input id = "email" className = "st input" placeholder = "Enter your email here" />
                <div className = "emailError">
                  {errorList.includes("email") && <div className = "errorText">Please enter a valid email address.</div>}
                </div>
                <label htmlFor ="suggestion label">Suggestion:</label>
                <div className = "suggestionContainer input st lh2">
                  <textarea id = "suggestion" placeholder = "Please let us know of any events in your community you'd like us to be involved in" className = "st input suggestion lh2" rows="2"></textarea>
                </div>            
            </form>
            
            <div className = "moreSubTextSection c">
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